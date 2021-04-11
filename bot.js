// IIFE (Immediately Invoked Function Expression) to set up variables
(function() {
	// setup the .env file
	require('dotenv').config()

	global.Discord = require('discord.js')
	global.fs = require('fs')
	// bot intents
	myintents = new Discord.Intents(Discord.Intents.NON_PRIVILEGED)
	myintents.add('GUILD_MEMBERS')
	global.client = new Discord.Client({ws: {intents: myintents}})
	global.users = []
	global.codes = []
	global.timezones = {}
	global.pics = null
	global.removing = null
	global.events = []
	global.botStatuses = []
})(); // had to use a semicolon so the interpreter doesn't see (function)()(function)() and throw an error

// another IIFE to import the functions

(function() {
	toimport = []
	fs.readdirSync('./modules').forEach(file => {
  		toimport.push(file.slice(0, -3))
	})
	toimport.forEach((item) => {
		module = require(`./modules/${item}`)
		global[item] = module[Object.keys(module)[0]]
	})
	readJSON()
	runatmidnight()
})()

function randomChoice(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

client.on('ready', async () => {
	// Set the status
	client.user.setActivity(`${randomChoice(botStatuses)}... | $help`)
	logger(`Ready to work!`, true)
	setInterval(() => {
		client.user.setActivity(`${randomChoice(botStatuses)}... | $help`)
	}, 900000)
})

client.on('guildMemberRemove', member => {
	client.channels.cache.get('753568398440398969').send(memberRemove(member))
})

client.on('guildMemberAdd', member => {
	client.channels.cache.get('753568398440398969').send(memberAdd(member))
	client.channels.cache.get('553733333234876426').send(`Welcome to the GeoFS Events Discord server ${member}, and thanks for joining!\n\nYou're in a waiting room, which is just an extra layer of security to prevent raiders and hackers from getting everything immediately.\n\nMake sure to read the <#553929583397961740> and the <#553720929063141379> channel for more information, then ping an online moderator to let you in!`)
})

client.on('messageUpdate', function(old, msg) {
	filter(msg)
})

client.on('message', async (msg) => {
	// If the message gets filtered out, the message sender is a bot, or the botping got triggered, then return

	if (msg.author.bot || filter(msg) || await botping(msg) || mentions(msg)) {
		return
	}

	// Save performance by filtering out everything not starting with the prefix
	if (!msg.content.startsWith('$')) {
		return
	}
	msg.content = msg.content.substring(1)
	// support for any caps combo message
	msg.content = msg.content.toLowerCase()

	if (msg.content.startsWith('uptime')) {
		return msg.channel.send('That can be found here:\n<https://events-bot.nrod06.repl.co/uptime>')
	}

	if (msg.content.startsWith('event')) {
		return eventembed(msg)
	}

	if (msg.content.startsWith('urmom')) {
		return msg.channel.send('has choncc belly')
	}

	if (msg.content.startsWith('addevent')) {
		return addevent(msg)
	}

	if (msg.content.startsWith('restart')) {
		return restart(msg)
	}

	if (msg.content.startsWith('electioninfo')) {
		return electioninfo(msg)
	}

	if (msg.content.startsWith('picture')) {
		return msg.channel.send(pics[Math.floor(Math.random() * pics.length)])
	}

	if (msg.content.startsWith('userinfo')) {
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

	if (msg.content.startsWith('settimezone') || msg.content.startsWith('addtimezone') || msg.content.startsWith('removetimezone') || msg.content.startsWith('updatemessage')) {
		return timezone(msg)
	}

	if (msg.content.startsWith('addimage')) {
		return addImage(msg)
	}

	if (msg.content.startsWith('ping') || msg.content.startsWith('pong')) {
		return ping(msg, client.ws.ping)
	}

	if (msg.content.startsWith('av')) {
		return avatar(msg)
	}

	if (msg.content.startsWith('help')) {
		return help(msg, checkcanvote(msg.member))
	}

	if (msg.content.startsWith('membercount')) {
		return msg.channel.send(`There are ${memberNumber(msg)} members in the server.`)
	}

	if (msg.content.startsWith('code')) {
		usercode = code(msg, checkcanvote(msg.member), users, codes)
		if (typeof usercode === "string") {
			codes.push(usercode)
			users.push(msg.author.id)
			saveJSON()
		}
		return
	}

	if (msg.content.startsWith('approve')) {
		return approve(msg)
	}

	if (msg.content.startsWith('questioning')) {
		return questioning(msg)
	}
})

// handle all errors
process.on("uncaughtException", (e) => {
	logger(`ERROR ${e}`, true)
	process.exit(1)
})
client.on("warn", (e) => {
	logger(`WARNING: ${e}`, true)
})

client.login(process.env.TOKEN)

// server
require('./server/server.js')

// since you've made it this far, you've been distracted.
// now go do whatever it is you were doing before
