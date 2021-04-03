const Discord = require('discord.js')

function rolegetter(user, client) {
// gets a string that mentions every role a user has
	guild = client.guilds.cache.get('553718744233541656')

	rolelist = {}
	str = ''
	roles = user.roles.member._roles
	roles.forEach(function(item) {
		role = client.roles.cache.get(item)
		rolelist[role.position] = role
	})
	while (true) {
		keys = Object.keys(rolelist)
		keys.sort((a, b) => b - a)
		keys.forEach((item) => {
			role = rolelist[item]
			str += `<@&${role.id}> `
		})
		break
	}
	return str
}

exports.memberRemove = function(member) {
	var embed = new Discord.MessageEmbed()
		.setColor('#d94c4c')
		.setAuthor('Member Left')
		.setDescription(`${member} ${member.user.tag}`)
		.addField('**Roles**', rolegetter(member, client))
		.setFooter(`ID: ${member.id}`)
		.setTimestamp()
	return embed
}