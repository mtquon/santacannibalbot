const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const discordTTS=require("discord-tts");


module.exports = {
    name: 'santa',
    aliases: ['santa'],
    category: 'Core',
    utilisation: '{prefix}santa',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - You can't use this comand while music is playing!`);
        const broadcast = client.voice.createBroadcast();
        var channelId=message.member.voice.channelID;
        var channel=client.channels.cache.get(channelId);
        channel.join().then(connection => {
            broadcast.play(discordTTS.getVoiceStream("Ho Ho Ho I am Andreas the Cannibal A.K.A Santa the Cannibal. I like to eat elves and be an Etheopian jew! Merry Christmas!"));
            const dispatcher=connection.play(broadcast);
        });
            
        
      
        
    },
};