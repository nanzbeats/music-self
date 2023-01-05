module.exports = {
	name: 'volume', 
    aliases:['v'],
	description: 'Set Music Volume!',
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    owner: true,
	async execute(message,args) 
    {
        const player = message.client.manager.get(message.guild.id);
        if (!args[0]) return message.reply({ content: "**Please provide volume limit!**" }).then(msg =>
            { 
            setTimeout(() => { 
                msg.delete() 
            }, 1000)
            });
        player.setVolume(args[0])
         return message.reply({ content: "Done ✅️."}).then(msg =>
            { 
            setTimeout(() => { 
                msg.delete() 
            }, 1000)
            });
        
	},
};
