exports.approve = function(msg) {
	if (msg.member.roles.cache.has("766386531681435678")) {
		if (msg.mentions.members.first() == undefined) {
			return msg.channel.send(`<@${msg.author.id}>, you have to mention someone!`)
		}
		let member = msg.mentions.members.first()
		if (member.roles.cache.some(role => role.name === 'Security Check')) {
			member.roles.set(['553723642568114187'])
			var message = `Welcome to GeoFS Events ${member}!\nWe hope you enjoy your stay!\nPlease make sure you have read <#553929583397961740> and <#553720929063141379>.\nWe organize and host events every day, so make sure to check <#756937922904850442> to keep up on events hosted for that day.\nThere are currently ${memberNumber(msg)} people in this server.\nIf you need any help or advice, contact the Elite Crew.\nUse <#818115761843339274> to put your event ideas in and we will do it as soon as possible!\n\nCheck out and subscribe to our channel here: <https://www.youtube.com/channel/UCZhJvrv8C6mb0FXENg6uh2w>`
			client.channels.cache.get('553718744657035274').send(message)
			return msg.channel.send('User approved sucessfully')
		}
		return msg.channel.send("That didn't work.")
	}
	return msg.channel.send(`<@${msg.author.id}>, you can't run that command!`)
}