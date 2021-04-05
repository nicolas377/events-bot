exports.botping = function(msg) {
	if (msg.content == '<@!780458120605990954>') {
		msg.channel.send('Hello! My command prefix is `$`\nIf you want to get a list of my commands, run `$help`')
		return true
	}
	return false
}