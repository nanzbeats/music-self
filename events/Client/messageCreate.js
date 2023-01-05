const {prefix,
      ownerid} = require('../../config.json')
// 
module.exports = {
    name: "messageCreate",
    async execute(client , message)
    {

        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
    
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) ||  client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
    
        if (command.owner && !ownerid.includes(message.author.id)) {
            return message.reply(`**❌ | You cant use this command!**`).then(msg =>
                { 
                setTimeout(() => { 
                    msg.delete() 
                }, 1000)
                });
             
        }
        
        if (command.sameVoiceChannel) {
            if (message.guild.me.voice.channel) {
                if (message.guild.me.voice.channelId !== message.member.voice.channelId) {
                    return message.reply(`**❗ | You must be in the same channel!**`).then(msg =>
                        { 
                        setTimeout(() => { 
                            msg.delete() 
                        }, 1000)
                        });
                  
                }
            }
        }

        const player = message.client.manager.get(message.guild.id);

        if (command.player && !player) {
            return message.reply("**❗ | There is no player.**").then(msg =>
                { 
                setTimeout(() => { 
                    msg.delete() 
                }, 1000)
                });
        }

        if (command.inVoiceChannel && !message.member.voice.channelId) {
            return message.reply("**❗ | You must be in a voice channel!**").then(msg =>
                { 
                setTimeout(() => { 
                    msg.delete() 
                }, 1000)
                });
        
        }
        
        
        else{

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
        }
        }

    }

      
}

