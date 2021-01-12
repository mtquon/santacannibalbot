const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');


module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        if (!args[0]) {
            const infos = message.client.commands.filter(x => x.category == 'Infos').map((x) => '`' + x.name + '`').join(', ');
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');

            const embedMessage = new Discord.MessageEmbed()
                .setColor('ORANGE')
                .setAuthor('Help Panel')
                .setTitle(":santa: I am Andreas the Cannibal AKA Santa the Cannibal :santa:")
                .setFooter("Santa isn't real i'm an etheopian jew. Happy Hanukkah")
                .setThumbnail('https://i.imgur.com/pDMeuxk.jpg')
                .addFields(
                    { name: 'Bot commands - NEW COMMANDS', value: "`join`,`gtfo`,`debug`,`ping` ,`cannibal`,`santa`" },
                    { name: 'Music commands', value: '`clear` (clear the queue), `filter`, `loop`, `np` (nowplaying), `play`, `queue`, `shuffle`, `skip`, `stop`, `v` (volume), `filters`' },
                    { name: 'Filters -WORKING NOW WITH NEW COMMANDS'  + "(/filter insertFilter)", value: "`caleb`(warning: only for those that love wubs!), `amy`,`max`,`jakob`,`sean`,`robot`, `nightcore`"}, 
                   
                )
                .setImage('https://i.imgur.com/Y2RtPV7.jpg')
                .setTimestamp(new Date())
                .setDescription(" \n:menorah: :star_of_david: :flag_et:" 
                +"\nTLDR: To use a command use `/InsertCommandHere`"
                +"\n**Everyone** can play music now... `/skip` to **skip** songs. You will probably be **JUDGED** by your music :face_with_monocle:."+ `\nTo use a command use  **${client.config.discord.prefix}InsertCommandHere**. Example : ${client.config.discord.prefix}gtfo to tell tell the Santa the Cannibal to GTFO.`
                +"\nFilters are sound effect you can apply onto the music playing. **EVERYONE** except **Andreas the cannibal** gets a filter because he eats elves'" )

         
            message.channel.send({embed: embedMessage})
            
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} - I did not find this command !`);

            message.channel.send({
                embed: {
                    color: 'ORANGE',
                    author: { name: 'Help pannel' },
                    footer: { text: "JK Santa isn't real. Click on the thumbnail pic at the top right of this message" },
                    fields: [
                        { name: 'Name', value: command.name, inline: true },
                        { name: 'Category', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join('\n'), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                    ],
                    timestamp: new Date(),
                    image:"https://i.imgur.com/pDMeuxk.jpg",
                    description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
                }
            });
        };
    },
};