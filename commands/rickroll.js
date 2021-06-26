const { DiscordAPIError, GuildMember } = require("discord.js");

var counter = 0;
module.exports = {
    name: 'rickroll',
    description: "never gonna give you up",
    execute(client, message, args, isReady) {
        if (!args[0]) return message.channel.send("Please enter a valid command, do '&rickroll help' to see all valid commands.");

        var voiceChannel = message.member.voice.channel;
        switch (args[0]) {
            case 'start':
                if (isReady) {
                    isReady = false;

                    console.log('isReady: ' + isReady)
                    if (!voiceChannel) {
                        return message.reply("You are not in a voice channel");
                    }

                    voiceChannel.join().then(connection => {
                        const dispatcher = connection.play('E:\Rick.mp3');

                        dispatcher.on('start', () => {
                            console.log('Rick.mp3 is now playing!');
                        });

                        dispatcher.on('finish', () => {
                            connection.disconnect();
                            isReady = true;
                            message.channel.send("The bot is done rickrolling you!");
                        });

                        dispatcher.on('error', console.error);
                    });
                }
                break;
            case 'stop':
                if (!voiceChannel) {
                    return message.reply("You are not in a voice channel");
                } else {
                    voiceChannel.leave();
                    counter = 0;
                    message.channel.send("Rick Astley has left your voice call!");
                    isReady = true;
                }
                break;
            case 'loop':
                if (isReady) {
                    isReady = false;

                    if (!voiceChannel) {
                        return message.reply("You are not in a voice channel");
                    } else {
                        message.channel.send("Rick Astley loop started!");
                    }

                    voiceChannel.join().then(connection => {

                        const play = () => {
                            const dispatcher = connection.play('E:\Rick.mp3')

                            dispatcher.on('start', () => {
                                console.log('Rick.mp3 is now playing!');
                            });

                            dispatcher.on('finish', () => {
                                counter++;
                                message.channel.send("You have listend to Rick Astly for " + counter + " times");
                                play()
                        })
                            dispatcher.on('error', console.error);
                        }
                        play()
                    });
                }
                break;
            case 'help':
                message.channel.send("**[&rickroll start]**: To play Rick Astley - Never Gonna Give You Up once.\n**[&rickroll stop]**: To stop the rickroll bot and disconnect it from your voice call.\n**[&rickroll loop]**: To infinitely play Rick Astley - Never Gonna Give You Up.");
                break;

        }
    }
}
