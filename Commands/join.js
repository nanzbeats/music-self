module.exports = {
	name: 'join',
	description: 'Join!',
	player: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
    owner: true,
	async execute(message) 
    {
        player = message.client.manager.create({
            guild: message.guild.id,
            voiceChannel: channel.id,
            textChannel: message.channel.id,
            volume: 80,
            selfDeafen: true,
          }) 
          if(player && player.state !== "CONNECTED") player.connect();
	},
};