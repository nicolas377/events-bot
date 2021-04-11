exports.status = function(msg) {
	status = client.user.presence.activities[0].name
	status = status.slice(0, -8)
	return msg.channel.send('The current status is: `' + status + '`')
}