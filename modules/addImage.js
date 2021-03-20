exports.addImage = function(msg) {
	if (msg.member.roles.cache.has("766386531681435678")) {
		if (msg.attachments.size > 0) {
			var Attachment = (msg.attachments).array()
			Attachment.forEach((item) => {
				pics.push(item.url)
			})
			saveJSON()
			msg.channel.send('Image added. Restarting.')
			process.exit()
			}
		return msg.channel.send(`${msg.author}, you need to attatch an image!`)
	}
	return msg.channel.send(`${msg.author}, you can't run that command!`)
}