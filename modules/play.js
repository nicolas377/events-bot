exports.play = async function(msg) {
	return msg.channel.send('No')
	
	if (!global.connection) {
		return msg.channel.send('The bot needs to be connected to a voice channel to play music!')
	}

	const dispatcher = connection.play(fs.createReadStream('./audio.mp3'))

	dispatcher.on('start', () => {
		console.log('On My Way is playing.')
	})
}