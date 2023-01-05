module.exports = {
	name: 'play',
    aliases: ['p'],
	description: 'Play Music!',
    inVoiceChannel: true,
    sameVoiceChannel: true,
    owner: true,
    async execute(message,args) 
    {
      const player = message.client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: true,
        volume: 80,
      });
  
      if (player.state != "CONNECTED") await player.connect();
      const search = args.join(' ');
      let res;
      try {
        res = await player.search(search, message.author);
        if (!player)
          return message.reply({ content: `**❌ | There is no music playing.**` }).then(msg =>
            { 
            setTimeout(() => { 
                msg.delete() 
            }, 1000)
            });
        if (res.loadType === 'LOAD_FAILED') {
          if (!player.queue.current) player.destroy();
          throw res.exception;
        }
      } catch (err) {
        return message.reply(`**❌ | there was an error while searching.**`).then(msg =>
          { 
          setTimeout(() => { 
              msg.delete() 
          }, 1000)
          });
      }
      switch (res.loadType) {
        case 'NO_MATCHES':
          if (!player.queue.current) player.destroy();
          return message.channel.send({ content: `**❌ | No matches found for - ${search}**` }).then(msg =>
            { 
            setTimeout(() => { 
                msg.delete() 
            }, 1000)
            });
        case 'TRACK_LOADED':
          var track = res.tracks[0];
          player.queue.add(track);
          if (!player.playing && !player.paused && !player.queue.size) {
            return player.play();
          } else {
            return message.reply({ content: `✅ |  **Added song to queue**\n[${track.title}]` }).then(msg =>
              { 
              setTimeout(() => { 
                  msg.delete() 
              }, 1000)
              });
          }
        case 'PLAYLIST_LOADED':
          player.queue.add(res.tracks);
          if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
          return message.reply({ content: `✅ | **Added playlist to queue**\n${res.tracks.length} Songs [${res.playlist.name}](${search})` }).then(msg =>
            { 
            setTimeout(() => { 
                msg.delete() 
            }, 1000)
            });
        case 'SEARCH_RESULT':
          var track = res.tracks[0];
          player.queue.add(track);
          if (!player.playing && !player.paused && !player.queue.size) {
            return player.play();
          } else {
            return message.reply({ content: `✅ |  **Added song to queue**\n[${track.title}]` }).then(msg =>
              { 
              setTimeout(() => { 
                  msg.delete() 
              }, 1000)
              });
          }
      }
    }
  }