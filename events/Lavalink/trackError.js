module.exports = async (client, player, track, payload) => {
        console.log('❌ Error when loading song! Track is error')
    if (!player.voiceChannel) player.destroy();

}