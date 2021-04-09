exports.mentions = function(msg) {

	if (typeof msg.mentions.members.first() == undefined && !msg.mentions.everyone) {
		return false
	}

	if (msg.member.roles.cache.has('553723628957728820') || msg.member.roles.cache.has('830214074264059984')) { // Bossman and Staff Members are exempt from all
		return false
	}

	if (msg.mentions.members.array().length > 2) { // if its 3 or more mentions
		msg.channel.send(`${msg.author}, keep it below 3 mentions!`)
		return true
	}

	nummentioned = msg.mentions.members.array().length

	if (nummentioned > 9) { // if its 10 or more mentions
		msg.member.roles.set(['762663566531624980'])
		client.channels.cache.get('767050317362757741').send(`${msg.author}, you've been sent to the questioning room because you mentioned ${nummentioned} people. You have to mention 9 or less people in a message.`)
		msg.channel.send('Off to the questioning room with you.')
		return true
	}

	if (msg.member.roles.cache.has('717878253305724932')) {
		// Event manager is exempt from @everyone
		return
	}

	if (msg.mentions.everyone) { // if everyone was mentioned
		msg.member.roles.set(['762663566531624980'])
		client.channels.cache.get('767050317362757741').send(`${msg.author}, you've been sent to the questioning room because you mentioned everyone.`)
		msg.channel.send('Off to the questioning room with you.')
		return true
	}

	return false
}