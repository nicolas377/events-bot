const Discord = require('discord.js')

exports.electioninfo = function(msg) {
	const embed = new Discord.MessageEmbed()
	embed.setColor('0099ff')
	embed.setTitle('Election Infomation')
	embed.addFields(/*{
		name: 'Currently',
		value: "We are electing 3 Event Managers right now!\nFirst Officer and up, look in <#779519068897280020> for more details."
	},*/ {
		name: 'Upcoming',
		value: "We will elect 3 Event Managers at the start of June!"
	}, {
		name: 'Future',
		value: 'We will continue having Event Manager elections every two months for the foreseeable future.'
	})

	return msg.channel.send(embed)
}