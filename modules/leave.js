exports.leave = function(msg) {
	if (global.connection) {
		if (!(global.connection.channel == msg.member.voice.channel)) {
			return msg.channel.send('You need to be in the voice chat with me to disconnect me!')
		}
		global.connection.disconnect()
		delete global.connection
		return msg.channel.send('Bot disconnected.')
	} else {
		return msg.channel.send("There is no channel to disconnect me from!")
	}
}