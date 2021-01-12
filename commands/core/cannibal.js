const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');


module.exports = {
    name: 'cannibal',
    aliases: ['can'],
    category: 'Core',
    utilisation: '{prefix}cannibal',

    execute(client, message) {
        message.channel.send({
            embed: {
                color: 'RED',
                title: 'WANTED',
	            url: 'https://i.imgur.com/vZBNiH4.jpg',
                author: {
                    name: 'FBI',
                    icon_url: 'https://i.imgur.com/vgw4wAD.png',
                    url: 'https://i.imgur.com/II8NxKc.jpg',
                },
                description: '**CAUTION**: This man is wanted for cannabilizing elves and pretending to be Santa. \n\n:warning: INDIVIDUAL IS CONSIDERED HIGHLY DANGEROUS AND IS KNOWN TO DISAPEAR AFTER TAKING A SHOWER :warning:',
                thumbnail: {
                    url: 'https://i.imgur.com/PoDOp82.jpg',
                },
                fields: [
                    {   name: "DESCRIPTION", value: '\u200b'},
                
                    {   name: 'AGE', 
                        value: "25", 
                        inline: true },
                    {   name: "HIEGHT", 
                        value: "420cm or 4.20 Teemos", 
                        inline: true },
                    {   name: 'WEIGHT', 
                        value: "No  clue", 
                        inline: true },
                    {   name: 'BUILD', 
                        value: "Like a  MAAAAAAAAAAAAAN" , 
                        inline: true },
                    {   name: 'HAIR', 
                        value: "Black" , 
                        inline: true },
                    {   name: 'OCCUPATION', 
                        value: "Slave to the biggest rain forest in the world" , 
                        inline: true },
                    {   name: 'NATIONALITY', 
                        value: "North Pole" , 
                        inline: true 
                    }

                ],
                timestamp: new Date(),
                image:{
                    url: "https://i.imgur.com/pDMeuxk.jpg",
                },
                footer:{
                    text:"click on FBI Pedophile & Counter Terrorism Unit and WANTED text for more images of the Etheopian Jew",
              
                }
            }
        });
    },
};