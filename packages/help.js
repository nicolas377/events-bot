const Discord = require('discord.js')
const CryptoJS = require('crypto-js')
const fs = require('fs')

exports.help = function(msg, canvote) {
	const embed = new Discord.MessageEmbed()
	embed.setColor('#0099ff')
	embed.setTitle('Events Bot Help')
	embed.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
	embed.setAuthor(msg.author.tag)
	embed.addFields({
		name: '\n$ping',
		value: 'Gets the latency from message sending to message repsonse'
	}, {
		name: '$av',
		value: "Gets the avatar of the mentioned user if they're in the server. Defaults to the person sending the msg."
	}, {
		name: '$membercount',
		value: 'Replies with the number of members in the server.'
	}, {
		name: '$electioninfo',
		value: 'Returns an embed with the infomation of all present and upcoming elections.'
	})
	if (canvote) {
		embed.addField('$code', "Election command. DM's the user the election code, along with the instructions for to vote.")
	}
	if (msg.member.roles.cache.some(role => role.name === 'Bot mod')) {
		embed.addField('$approve', 'Gives a user in the waiting room the Junior Pilot role and sends a welcome message.')
		embed.addField('$questioning', "Logs all the roles of the user, then overwrites the user's roles with the questioning role.")
		embed.addField('$addimage', "Adds a new image to the bot's reserves. Requires a file attachment.")
	}
	embed.addField('$help', 'This command.')
	embed.setImage(pics[Math.floor(Math.random() * pics.length)])
	embed.setTimestamp()
	msg.channel.send(embed)
}