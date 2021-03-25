const Discord = require('discord.js')

exports.memberAdd = function(member) {
	existed = Date.now() - member.user.createdAt
	existed = timeHandler(existed)
	member.roles.set(['752701923399958610', '553723645265182720'])
	embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setAuthor('Member Joined')
		.setDescription(`${member} ${member.user.tag}`)
		.addField('**Account Age**', `${existed}`)
		.setFooter(`ID: ${member.id}`)
		.setTimestamp()
	return embed
}