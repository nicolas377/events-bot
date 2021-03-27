const Discord = require('discord.js')

exports.electioninfo = function(msg) {
	const embed = new Discord.MessageEmbed()
	embed.setColor('0099ff')
	embed.setTitle('Election Infomation')
	embed.setAuthor(msg.author.tag)
	embed.addFields({
		name: 'Currently',
		value: "We will elect 3 Event Managers on April 3rd and 4th.\nThe election will be run using STV, with the code system from this bot."
	}/*, {
		name: 'Upcoming',
		value: "Elections will be here 4 weeks before polls open."
	}*/, {
		name: 'Future',
		value: 'We will continue having monthly Event Manager elections for the foreseeable future.'
	})

	return msg.channel.send(embed)
}