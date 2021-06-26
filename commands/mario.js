module.exports = {
    name: 'mario',
    description: "its a stone luigi",
    execute(cleint, message, args, isReady) {
        if (!args[0]) return message.channel.send('Please enter a valid command');

        var voiceChannel = message.member.voice.channel;
        console.log(args[0]);
        switch (args[0]) {
            case 'start':
                if (isReady) {
                    isReady = false;

                    console.log('isReady: ' + isReady)
                    if (!voiceChannel) {
                        return message.reply("You are not in a voice channel");
                    }

                    voiceChannel.join().then(connection => {
                        const dispatcher = connection.play('E:\mario.mp3');

                        dispatcher.on('start', () => {
                            message.channel.send('Source: https://www.youtube.com/watch?v=XzwiP2yOuDE')
                        });

                        dispatcher.on('finish', () => {
                            connection.disconnect();
                            isReady = true;
                        });

                        dispatcher.on('error', console.error);
                    });
                }
                break;
            case 'stop':
                voiceChannel.leave();
                isReady = true;
                break;
        }
    }
}