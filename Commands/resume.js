module.exports = {
	name: "resume",
    aliases: ["r"],
    description: "Resume music",
    owner: true,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    async execute(message) 
   {
		const player = message.client.manager.get(message.guild.id);
        const song = player.queue.current;

        if (!player.queue.current) {
            return message.reply({content: "**❗ | There is no music playing.**"}).then(msg =>
                { 
                setTimeout(() => { 
                    msg.delete() 
                }, 1000)
                });
        }
        if (!player.paused) {
          return message.reply({conten: ` The player is already **resumed**.`}).then(msg =>
            { 
            setTimeout(() => { 
                msg.delete() 
            }, 1000)
            });
        }

        player.pause(false);

        return message.reply({content: ` **Resumed**\n[${song.title}](${song.uri})`}).then(msg =>
            { 
            setTimeout(() => { 
                msg.delete() 
            }, 1000)
            });
	
        }
    }
