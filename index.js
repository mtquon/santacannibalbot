const fs = require('fs');
const discord = require('discord.js');
const fetch = require("node-fetch");
const discordTTS=require("discord-tts");



const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');



client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis
client.filters = client.config.filters;
client.commands = new discord.Collection();




fs.readdirSync('./commands').forEach(dirs =>{
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };

})

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

   

client.login(client.config.discord.token);

client.on("message",async(message)=>{
  
     const args= message.cleanContent.split(" ");
     const command = args.shift().toLowerCase();
     if (command === "/join"){
      

        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

    
             //join the sender's voice channel if they are in one themselves
            if(message.member.voice.channel){
                const connection = message.member.voice.channel.join()
                let keywords ="santa claus"
                let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${client.config.discord.TENORKEY}&contentfilter=high`;
                        try{
                    let response = await fetch(url);
                    let json = await response.json();
                    const index = Math.floor(Math.random() * 20)+1;
                    
                    message.channel.send("HO HO HO Happy Holidays and Merry Christmas! :christmas_tree: :partying_face: :santa: :menorah: "
                                        )
                    await  message.channel.send(json.results[index].url);
            
                    }catch(error){
                        console.log(`error sending gif on user joined \n${error}`)
                    }
                    await client.player.play(message, "https://www.youtube.com/playlist?list=PLaiDPygC6aVRSHWNZa5zrfNJv8mwBONNE");
                    await client.player.shuffle(message);

             }else{
                message.channel.send('You need to join a voice channel first!');
            };
     }
     else if(command ==="/gtfo"){
        const fetch = require("node-fetch");
        let keywords ="santa claus"
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${client.config.discord.TENORKEY}&contentfilter=high`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        message.guild.me.voice.channel.leave();
        message.channel.send(" HO HO HO! :santa: I am leaving to eat more elves!  YEEEEEEEEEEEEET!");
        message.channel.send("https://tenor.com/view/punt-kick-baby-grandma-gif-8217719")
        await message.channel.send(json.results[index].url)
     };


});

client.on("voiceStateUpdate", async(oldState, newState) => {
  
    let oldVoice = oldState.channelID; // the previous channel, if there was one
    let newVoice = newState.channelID; // the current channel, if there is one
    let textChannel = oldState.guild.channels.cache.find(channel => channel.name === 'general');

                
    
  
    if (oldVoice == null) {
        console.log("User joined!");
        if(newState.member.displayName!=="SantaTheCannibal"){

            let url = `https://api.tenor.com/v1/search?q=santa&key=${client.config.discord.TENORKEY}&contentfilter=high`;
            try{
            let response = await fetch(url);
            let json = await response.json();
            const index = Math.floor(Math.random() * json.results.length);
            textChannel.send(`Ho Ho Ho. Greetingos <@${newState.id}>! \nHappy Holidays! :santa: \n/help for commands`);
            await textChannel.send(json.results[index].url);
            }catch(error){
                console.log(`error sending gif on user joined \n${error}`)
            }
        }
        
      } else if (newVoice == null) {
        console.log("User left!");
        if(newState.member.displayName!=="SantaTheCannibal"){
            try{
            let url = `https://api.tenor.com/v1/search?q=santa%20bye&key=${client.config.discord.TENORKEY}&contentfilter=high`;
            let response = await fetch(url);
            let json = await response.json();
            const index = Math.floor(Math.random() * json.results.length);
            textChannel.send(`:christmas_tree:Leaving so soon? Goodbye and Happy Holidays <@${newState.id}>!:christmas_tree:`);
            console.log(`index is ${index}`)
            await textChannel.send(json.results[index].url);
            }catch(error){
                console.log(`error sending gif on user leaving  \n${error}`)

            }
        }

      } else {
        console.log("User switched channels!");
      }
});


    