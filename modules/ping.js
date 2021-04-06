exports.ping = async function(msg, ping) {

	let sent = await msg.channel.send('Loading...')

	if (msg.content.startsWith('pong')) {
		var newmsg = `:ping_pong: Ping!\nLatency is ${sent.createdTimestamp - msg.createdTimestamp}ms.\nAPI Latency is ${Math.round(ping)} ms`
	} else {
		var newmsg = `:ping_pong: Pong!\nLatency is ${sent.createdTimestamp - msg.createdTimestamp}ms.\nAPI Latency is ${Math.round(ping)} ms`
	}

	sent.edit(newmsg)

	logger(`PING: API latency is ${Math.round(ping)} ms`)
}