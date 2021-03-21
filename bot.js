// IIFE to set up variables
(function() {
	global.Discord = require('discord.js')
	global.CryptoJS = require('crypto-js')
	global.fs = require('fs')
	global.client = new Discord.Client()
	global.users = []
	global.codes = []
	global.pics = null
	global.removing = null
})(); // had to use a semicolon so the interpreter doesn't see (function)()(function)() and throw an error

// another IIFE to import the functions

(function() {
	toimport = ['avatar', 'codeMsg', 'timeHandler', 'help', 'electioninfo', 'logger', 'addImage', 'randomString', 'ping', 'filter', 'readJSON', 'saveJSON', 'memberNumber', 'userinfo', 'botping', 'memberRemove', 'memberAdd', 'approve', 'questioning']
	toimport.forEach((item) => {
		module = require(`./modules/${item}`)
		global[item] = module[Object.keys(module)[0]]
	})
	readJSON()
})()

client.on('ready', () => {
	// Set the status
	client.user.setActivity('the GeoFS Events Server | $help', {
		type: 'WATCHING'
	})
	console.log("Ready to work!")
})

client.on('guildMemberRemove', member => {
	client.channels.cache.get('753568398440398969').send(memberRemove(member))
})

client.on('guildMemberAdd', member => {
	client.channels.cache.get('753568398440398969').send(memberAdd(member))
	client.channels.cache.get('553733333234876426').send(`Welcome to GeoFS Events ${member}! Please read the <#553929583397961740> and <#553720929063141379>, and then ping an online Elite Crew member to let you in!`)
})

client.on('message', async (msg) => {
	// If the message gets filtered out, the message sender is a bot, or the botping got triggered, then return
	if (msg.author.bot || await filter(msg) || botping(msg)) {
		return
	}

	// Save performance by filtering out everything not starting with the prefix
	if (!msg.content.startsWith('$')) {
		return
	}

	// elections are not currently open
	var canvote = false

	// support for any caps combo message
	msg.content = msg.content.toLowerCase()

	if (msg.content.startsWith('$electioninfo')) {
		return msg.channel.send(electioninfo(msg))
	}

	if (msg.content.startsWith('$user')) {
		return msg.channel.send(userinfo(msg))
	}

	if (msg.content.startsWith('$addimage')) {
		return addImage(msg)
	}

	if (msg.content.startsWith('$ping')) {
		return ping(msg, client.ws.ping)
	}
	if (msg.content.startsWith('$av')) {
		return avatar(msg)
	}
	if (msg.content.startsWith('$help')) {
		return help(msg, canvote)
	}
	if (msg.content.startsWith('$membercount')) {
		return msg.channel.send(`There are ${memberNumber(msg)} members in the server.`)
	}
	if (msg.content.startsWith('$code')) {
		return msg.channel.send(`${msg.author}, there is no running election!`)
	}
	if (msg.content.startsWith('$approve')) {
		return approve(msg)
	}
	if (msg.content.startsWith('$questioning')) {
		return questioning(msg)
	}
	return msg.channel.send(`Seems like that isn't a command!`)
})

// handle all errors
process.on("uncaughtException", (e) => {	client.channels.cache.get('815629216372621373').send(`The bot ran into an error and needs to restart. Please refrain from using the bot until <@550456900861427733> fixes it. ${e}`)
	logger(`ERROR ${e}`, true)
	process.exit(1)
})
client.on("warn", (e) => logger(`WARNING: ${e}`, true))

setInterval(() => {
	logger('Still working.')
}, 900000)

client.login(process.env.TOKEN)

// HTTP server

const http = require('http')
const server = http.createServer((request, response) => {
	response.writeHead(200)
	response.end('ok')
})
server.listen(3000)

// since you've made it this far, you've been distracted.
// now go do whatever it is you were doing before