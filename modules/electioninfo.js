const Discord = require('discord.js')

exports.electioninfo = function(msg) {
	const embed = new Discord.MessageEmbed()
	embed.setColor('0099ff')
	embed.setTitle('Election Infomation')
	embed.setAuthor(msg.author.tag)
	embed.addFields({
		name: 'Currently',
		value: 'There are no current running elections.'
	}, {
		name: 'Future',
		value: "There will be a Event Manager election on April 3rd. Get in your flights and you'll be able to run!\nFurther details coming soon."
	})

	return embed
}