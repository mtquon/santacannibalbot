const discord = require("discord.js");
module.exports = async (client) => {
    client.on("voiceStateUpdate", (oldState, newState) => {

        let oldChannel = oldState.voiceChannel; // the previous channel, if there was one
        let newChannel = newState.voiceChannel; // the current channel, if there is one
      
        if(oldUserChannel === undefined && newUserChannel !== undefined) {

            console.log("user joined")

        } else if(newUserChannel === undefined){
   
          // User leaves a voice channel
            console.log("userleft")
        }
    });
    

}