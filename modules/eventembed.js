const Discord = require('discord.js')

// thanks to https://stackoverflow.com/a/29774197
function formatdate(ms) {
	date = new Date(ms)
	return date.toISOString().split('T')[0]
}

exports.eventembed = function(msg) {
	embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Events List')
		.setAuthor(msg.author.tag)
	events.forEach((item) => {
		date = formatdate(item[0])
		title = item[1]
		description = item[2]

		embed.addField(`${date}: ${title}`, description)
	})
	return msg.channel.send(embed)
}