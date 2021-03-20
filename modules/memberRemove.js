const Discord = require('discord.js')

exports.memberRemove = function(member) {
	var embed = new Discord.MessageEmbed()
	embed.setColor('#d94c4c')
	embed.setAuthor('Member Left')
	embed.setDescription(`${member} ${member.user.tag}`)
	embed.setFooter(`ID: ${member.id}`)
	embed.setTimestamp()
	return embed
}