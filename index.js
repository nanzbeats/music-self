//Express Server
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Bot Is Working Well!'));

app.listen(port, () => console.log(`listening at http://localhost:${port}`));

//Bot
const {
       Client,
       Collection
      } = require('discord.js-selfbot-v13');
const client = new Client({
  checkUpdate : false
});
const fs = require('fs')
const { 
  Manager
 } = require("erela.js");
 const Spotify = require("erela.js-spotify");
const { token,
        ownerid,
        nodes,
        SpotifyID,
        SpotifySecret
     } = require('./config.json');
    if (!token || !ownerid) {
        console.log('Please Fill Out Config file')
        process.exit()
      }

    
      client.manager = new Manager({
        nodes: nodes,
        plugins: [
          new Spotify({
            clientID: SpotifyID,
            clientSecret: SpotifySecret
          }),
        ],
        send(id, payload) {
          const guild = client.guilds.cache.get(id);
          if (guild) guild.shard.send(payload);
        },
      })

client.commands = new Collection();
this.aliases = new Collection();

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);
	client.commands.set(command.name, command);
}

fs.readdirSync("./events/Client/").forEach(file => {
    const event = require(`./events/Client/${file}`);
    client.on(event.name, (...args) => event.execute(client, ...args));
});

fs.readdirSync("./events/Lavalink/").forEach(file => {
  const event = require(`./events/Lavalink/${file}`);
  let eventName = file.split(".")[0];
  client.manager.on(eventName, event.bind(null, this));
});
process.on("unhandledRejection", (reason, promise) => {
  try {
    console.error(
      "Unhandled Rejection at: ",
      promise,
      "reason: ",
      reason.stack || reason
    );
  } catch {
    console.error(reason);
  }
});



client.login(token);
