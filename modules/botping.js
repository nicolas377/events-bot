exports.botping = async function(msg) {
	if (msg.content.startsWith('<@!780458120605990954>')) {
		msg.delete()
		msg.channel.send(`urmom`)
		return true
	}
	return false
}