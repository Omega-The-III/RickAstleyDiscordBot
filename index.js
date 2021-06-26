const { substr } = require('ffmpeg-static');
const { Description } = require('minecraft-server-util');
const util = require('minecraft-server-util');

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const prefix = '&';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

var isReady = true;

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('OmegaTrackBot is Online!')
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'ping') {
        client.commands.get('ping').execute(message);
    }
    else if (command === 'rickroll') {
        client.commands.get('rickroll').execute(client, message, args, isReady);
    }
    else if (command === 'dbuser') {
        client.commands.get('dbuser').execute();
    }
    else if (command === 'queryserver') {
        client.commands.get('queryserver').execute();
    }
    else if (command === 'mario') {
        client.commands.get('mario').execute(client, message, args, isReady);
    }
    else if (command === 'serverstatus') {
        client.commands.get('serverstatus').execute(client, message, args, Discord);
    }
});

client.login('ODIxNzUwMjMxNTM2MjM4NjMy.YFIQig.On-lEYJG3cR_o2JQemeX2O6XQiA');