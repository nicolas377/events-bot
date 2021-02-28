exports.help = function(msg) {
	const embed = new Discord.MessageEmbed()
	embed.setColor('#0099ff')
	embed.setTitle('Events Bot Help')
	embed.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
	embed.setAuthor(msg.author.tag)
	embed.addFields(
		{ name: '\n$ping', value: 'Gets the latency from message sending to message repsonse' },
		{ name: '$av', value: "Gets the avatar of the mentioned user if they're in the server. Defaults to the person sending the message." },
		{ name: '$code', value: "Election command. DM's the user the election code, along with the instructions for to vote. Only runs on the Election Boi role as of now."},
		{ name: '$help', value: 'This command' }
	)
	embed.setImage(pics[Math.floor(Math.random() * pics.length)])
	embed.setTimestamp()
	return embed
}