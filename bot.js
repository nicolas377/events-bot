// IIFE (Immediatly Invoked Function Expression) to set up variables
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
	toimport = ['avatar', 'timeHandler', 'help', 'electioninfo', 'logger', 'addImage', 'randomString', 'ping', 'filter', 'readJSON', 'saveJSON', 'memberNumber', 'userinfo', 'botping', 'memberRemove', 'memberAdd', 'approve', 'questioning', 'code', 'checkcanvote']
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
	logger('Ready to work!', true)
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
	// support for any caps combo message
	msg.content = msg.content.toLowerCase()

	if (msg.content.startsWith('$electioninfo')) {
		return electioninfo(msg)
	}

	if (msg.content.startsWith('$userinfo')) {
		var author, member
		if (msg.mentions.members.first() == undefined) {
			author = msg.author
			member = msg.member
		} else {
			member = msg.mentions.members.first()
			author = client.users.cache.get(member.id)
		}
		return userinfo(msg, member, author)
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
		return help(msg, checkcanvote(msg.member))
	}

	if (msg.content.startsWith('$membercount')) {
		return msg.channel.send(`There are ${memberNumber(msg)} members in the server.`)
	}

	if (msg.content.startsWith('$code')) {
		code = code(msg, checkcanvote(msg.member), users, codes)
		if (typeof code === "string") {
			codes.push(code)
			users.push(msg.author.id)
			saveJSON()
		}
		return
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
process.on("uncaughtException", async (e) => {c
	client = new Discord.Client()
	await client.channels.cache.get('815629216372621373').send(`The bot ran into an error and needs to restart. Please refrain from using the bot until <@550456900861427733> fixes it. ${e}`)
	await logger(`ERROR ${e}`, true)
	process.exit(1)
	client.login(process.env.TOKEN)
})
client.on("warn", (e) => logger(`WARNING: ${e}`, true))

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