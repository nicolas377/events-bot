exports.status = function(msg) {
	statustxt = client.user.presence.activities[0].name
	statustxt = statustxt.slice(0, -8)
	return msg.channel.send('The current status is: `' + statustxt + '`')
}