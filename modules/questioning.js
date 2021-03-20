exports.questioning = function(msg) {
	if (msg.member.roles.cache.has("766386531681435678")) {
		if (msg.mentions.members.first() == undefined) {
			return msg.channel.send(`<@${msg.author.id}>, you have to mention someone!`)
		}
		let member = msg.mentions.members.first()
		if (member.roles.cache.has("766386531681435678")) {
			return msg.channel.send("That user can't be sent to the questioning room!")
		} else {
			let rolenames = []
			let roles = member.roles.member._roles
			roles.forEach(function(item) {
				let role = msg.guild.roles.cache.get(item)
				rolenames.push(role.name)
			})
			client.channels.cache.get('760831152109649940').send(`${member} had roles ${rolenames.join(', ')}`)
			member.roles.set(['762663566531624980'])
			client.channels.cache.get('767050317362757741').send(`<@${member.id}>, you've been sent to the questioning room.`)
			return msg.channel.send(`${member} has been sent to the questioning room`)
		}
	}
	return msg.channel.send(`<@${msg.author.id}>, you can't run that command!`)
}