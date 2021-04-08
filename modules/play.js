exports.play = function(msg) {
	if (!global.connection) {
		return msg.channel.send('The bot needs to be connected to a voice channel to play music!')
	}

	msg.content = msg.content.substring(5)
}