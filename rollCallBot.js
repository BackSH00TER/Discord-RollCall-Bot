// Bot needs to request
// TextPermissions:
// - Send Messages
// - Manage Messages
// Invite to join server
// https://discordapp.com/oauth2/authorize?client_id=XXXXXXX&scope=bot&permissions=10240


// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

const Discord = require('discord.js');
const client = new Discord.Client();

const BOT_SECRET_TOKEN = "<BOT_SECRET_TOKEN>";
const ROLL_CALL_CHANNEL_ID = '<ROLL_CALL_CHANNEL_ID_HERE>'; 


// Helper to find channel id
// client.on('ready', () => {
//     client.channels.forEach(channel => {
//         console.log('Channel: ', channel.name, ', Channel ID: ', channel.id);
//     })
// })


client.on('message', (receivedMessage) => {
    if(receivedMessage.author === client.user || receivedMessage.channel.id !== ROLL_CALL_CHANNEL_ID) {
        return;
    }
 
    if(receivedMessage.content.startsWith('!')) {
        processCommand(receivedMessage);
    }
})

const processCommand = (message) => {
    const rollCallChannel = client.channels.get(ROLL_CALL_CHANNEL_ID);
    const nickname = message.member.nickname;

     // Remove leading exclamation mark and get args
    const commandArgs = message.content.substr(1).split(' ');
    const department = commandArgs[1] || 'Officer';
    
    if(commandArgs[0].toLowerCase() === "clockin") {
        const time = getESTDate();
        const rollCallMsg = `\`\`\`${department} ${nickname} 10-6 @${time}\`\`\``;

        rollCallChannel.send(rollCallMsg);
        message.delete(200);
    }

    if(commandArgs[0].toLowerCase() === "clockout") {
        const time = getESTDate();
        const rollCallMsg = `\`\`\`${department} ${nickname} 10-23 @${time}\`\`\``;

        rollCallChannel.send(rollCallMsg);
        message.delete(200);
    }
}

// Gets the Date and converts to EST military time
const getESTDate = () => {
    const date = new Date (new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Add zero before the number if its single digit
    if(hours < 10) {
        hours = '0' + hours;
    }
    if(minutes < 10) {
        minutes = '0' + minutes;
    }

    return hours + '' + minutes;
}

client.login(BOT_SECRET_TOKEN);
