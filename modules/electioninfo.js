const Discord = require('discord.js')

exports.electioninfo = function(msg) {
	const embed = new Discord.MessageEmbed()
	embed.setColor('0099ff')
	embed.setTitle('Election Infomation')
	embed.setAuthor(msg.author.tag)
	embed.addFields({
		name: 'Currently',
		value: "We are electing 3 Event Managers right now!\nFirst Officer and up, look in <#779519068897280020> for more details."
	}/*, {
		name: 'Upcoming',
		value: "Elections will be here 4 weeks before polls open."
	}*/, {
		name: 'Future',
		value: 'We will continue having monthly Event Manager elections for the foreseeable future.'
	})

	return msg.channel.send(embed)
}