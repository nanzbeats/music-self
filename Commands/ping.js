module.exports = {
	name: 'ping',
	description: 'Pong!',
	owner: true,
	async execute(message) 
    {
		message.reply({content : `${Math.round(message.client.ws.ping)}Ms`}).then(msg =>
            { 
            setTimeout(() => { 
                msg.delete() 
            }, 1000)
            });
	},
};