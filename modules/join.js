exports.join = async function(msg) {
	if (!msg.guild) {
		return
	}

	if (!msg.member.voice.channel) {
		return msg.channel.send('You need to be connected to a voice channel for the bot to join!')
	} else {
		global.connection = await msg.member.voice.channel.join();
		return msg.channel.send('Bot joined voice chat.')
	}
}