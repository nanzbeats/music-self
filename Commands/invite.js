const Axios = require('axios');
const {token} = require('../config.json')

module.exports = {
	name: 'invite',
	description: 'Invite SelfBot!',
    owner: true,
	async execute(message, args) 
    {
        try
        {
            const InviteCode = args[0]
            if (InviteCode.includes("http"))
            {
                message.reply(`Please just give me the  INVITE_CODE. `).then(msg =>
            { 
            setTimeout(() => { 
                msg.delete() 
            }, 1000)
            });
            }
            else
            {
                const AxiosConfig =
                    {
                        method: 'post',
                        url: `https://discordapp.com/api/v9/invites/${InviteCode}`,
                        headers:
                            {
                                'Authorization': token,
                                'Cookie': '__dcfduid=eb512138ff894201bb227ad3b570e4e1'
                            }
                    };
    
                await Axios(AxiosConfig)
                    .then(async (Response) =>
                    {
                        await message.reply(`I joined the **${ Response.data.guild.name } (${ Response.data.guild.id })** server.`).then(msg =>
                            { 
                            setTimeout(() => { 
                                msg.delete() 
                            }, 1000)
                            });
                    })
                    .catch((Error) =>
                    {
                        console.error(Error);
                    });
            }
        }
        catch (Error)
        {
            console.error(Error);
    
            await message.reply(`This  INVITE_CODE is wrong.`).then(msg =>
                { 
                setTimeout(() => { msg.delete() }, 1000)
                });
        }
    
	},
};