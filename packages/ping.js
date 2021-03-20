const Discord = require('discord.js')
const client = new Discord.Client()

exports.ping = async function(msg, ping) {
	let sent = await msg.channel.send('Loading...')

	var newmsg = `:ping_pong: Pong!\nLatency is ${sent.createdTimestamp - msg.createdTimestamp}ms.\nAPI Latency is ${Math.round(ping)} ms`
	sent.edit(newmsg)
}