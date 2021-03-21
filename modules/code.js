const Discord = require('discord.js')

exports.code = function(msg, canvote, users, codes) {

	// filter out all the people that can't vote
	if (!canvote) {
		return msg.channel.send(`${msg.author}, you can't vote right now!`)
	}
	if (users.includes(msg.author.id)) {
		return msg.channel.send(`${msg.author}, you've already voted!`)
	}

	// the user can vote, so ~~let them eat cake~~ let them have the code
	code = randomString(64)
	if (codes.includes(code)) {
		code = randomString(64)
	}
	embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Election Instructions')
		.setAuthor(msg.author.tag)
		.setDescription('Instructions:')
		.addFields(
			{
				name: 'Step 1',
				value: 'Open the google form here: (link)'
			},
			{
				name: 'Step 2',
				value: `Copy this to your clipboard: ${'```' + code + '```'}`
			},
			{
				name: 'Step 3',
				value: 'Follow the instructions in the Google form to submit the ballot'
			},
			{
				name: 'Step 4',
				value: 'There is no step 4'
			}
		)
		.setTimestamp()
	msg.author.send(embed)
	msg.channel.send(`${msg.author}, check your dm's for instructions!`)
	return code
}