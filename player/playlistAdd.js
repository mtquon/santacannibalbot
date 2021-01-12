module.exports = (client, message, playlist) => {
    message.channel.send(`${client.emotes.music} - **${playlist.tracks.length}**  songs have been added to the queue!`);
    message.channel.send(playlist.tracks.map((track, i) => {
        return `**#${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`
    }).slice(0, 5).join('\n') + `\n\n${playlist.tracks.length > 5 ? `And **${playlist.tracks.length - 5}** other songs...` : ``}`);
  
};