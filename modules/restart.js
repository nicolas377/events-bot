exports.restart = async function(msg) {
	if (msg.author.id == '550456900861427733') {
		logger('Restarting.', false)
		await msg.channel.send('Restarting. See you soon!')
		process.exit(0)
	}
	return false
}