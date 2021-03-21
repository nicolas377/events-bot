const Discord = require('discord.js')

exports.electioninfo = function(msg) {
	const embed = new Discord.MessageEmbed()
	embed.setColor('0099ff')
	embed.setTitle('Election Infomation')
	embed.setAuthor(msg.author.tag)
	embed.addFields({
		name: 'Currently',
		value: 'There are no running elections currently.'
	}, {
		name: 'Future',
		value: "We will elect 3 Event Managers on April 3rd and 4th. In order to run, you must have 2 flights and 20 flight points in March.\nThe election will be run using STV, with the code system from this bot."
	})

	return embed
}