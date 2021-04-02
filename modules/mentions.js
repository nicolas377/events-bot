exports.mentions = function(msg) {

	if (typeof msg.mentions.members.first() == undefined) {
		return false
	}

	if (msg.mentions.members.array().length > 2) { // if its 3 or more mentions
		msg.delete({timeout: 5000})
		msg.channel.send(`${msg.author}, keep it below 3 mentions!`)
		return true
	}

	if (msg.member.roles.cache.has('760665499330936922') || msg.member.roles.cache.has('553723628957728820')) { // Elite Crew and Bossman are exempt from 10+ and everyone
		return false
	}

	nummentioned = msg.mentions.members.array().length

	if (nummentioned > 9 || msg.mentions.everyone) { // if its 10 or more mentions or everyone was mentioned
		msg.delete({timeout: 5000})
		msg.member.roles.set(['762663566531624980'])
		client.channels.cache.get('767050317362757741').send(`<@${member.id}>, you've been sent to the questioning room because you mentioned ${nummentioned} people. You have to mention 9 or less people in a message.`)
		msg.channel.send('Off to the questioning room with you.')
		return true
	}

	return false
}