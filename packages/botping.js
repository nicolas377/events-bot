exports.botping = function(msg) {
	if (msg.content == '<@780458120605990954>') {
		var sendingmsg = 'Hello! My command prefix is `$`\nIf you want to get a list of my commands, run `$help`'
		msg.channel.send(sendingmsg)
		return true
	}
	return false
}