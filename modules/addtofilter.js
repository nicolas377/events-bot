exports.addtofilter = async function(msg) {
	if (msg.content.startsWith('$addtofilter')) {
		if (!(msg.author.id == '338699055943254030'|| msg.author.id == '550456900861427733')) {
			return msg.channel.send("You can't run that command!")
		}
		removing.push(msg.content.substring(13))
		await saveJSON()
		await msg.channel.send('Word added. Restarting.')
		process.exit(0)
		return true
	}
	return false
}