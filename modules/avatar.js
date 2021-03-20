const Discord = require('discord.js')

exports.avatar = function(msg) {
	if (msg.mentions.users.first() == undefined) {
		var user = msg.author
	} else {
		var user = msg.mentions.users.first()
	}
	const avatarEmbed = new Discord.MessageEmbed()
	avatarEmbed.setColor(0x333333)
	avatarEmbed.setAuthor(user.tag)
	avatarEmbed.setImage(user.displayAvatarURL({
		format: 'png',
		dynamic: true,
		size: 2048
	}));
	msg.channel.send(avatarEmbed);
	return
}