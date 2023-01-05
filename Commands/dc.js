module.exports = {
	name: 'dc',
	description: 'Disconnect!',
	player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    owner: true,
	async execute(message) 
    {
        const player = message.client.manager.get(message.guild.id);
        player.destroy();
	},
};