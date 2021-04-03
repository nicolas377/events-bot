exports.addImage = async function(msg) {
	if (msg.member.roles.cache.has("717878253305724932")) {
		if (msg.attachments.size > 0) {
			var Attachment = msg.attachments.array()
			Attachment.forEach((item) => {
				pics.push(item.url)
			})
			saveJSON()
			await msg.channel.send('Image added. Restarting.')
			process.exit()
			}
		return msg.channel.send(`${msg.author}, you need to attatch an image!`)
	}
	return msg.channel.send(`${msg.author}, you can't run that command!`)
}