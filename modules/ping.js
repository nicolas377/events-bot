exports.ping = function (msg) {
	msg.channel.send(`:ping_pong: Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
}