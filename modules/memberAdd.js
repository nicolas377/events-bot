const Discord = require('discord.js')

exports.memberAdd = function(member) {
	existed = Date.now() - member.user.createdAt
	existed = timeHandler(existed)
	member.roles.set(['752701923399958610', '553723645265182720'])
	embed = new Discord.Messageembed()
	embed.setColor('#0099ff')
	embed.setAuthor('Member Joined')
	embed.setDescription(`${member} ${member.user.tag}`)
	embed.addField('**Account Age**', `${existed}`)
	embed.setFooter(`ID: ${member.id}`)
	embed.setTimestamp()
	return embed
}