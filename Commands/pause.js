module.exports = {
	name: 'pause',
	description: 'Pause Music!',
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    owner: true,
	async execute(message) 
    {
        const player = message.client.manager.get(message.guild.id);
       message.reply({content : `Pause Enabled!`}).then(msg =>
            { 
            setTimeout(() => { 
                msg.delete() 
            }, 1000)
            });
            if (!player.paused) return player.pause(true);
            return player.pause(false);
	},
};