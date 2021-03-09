const Discord = require('discord.js');
const client = new Discord.Client();
const CryptoJS = require('crypto-js')
const fs = require('fs');
var users = []
var codes = []
var pics = null
var removing = null

// define the functions

function convertMiliseconds(miliseconds) {
	var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

	total_seconds = parseInt(Math.floor(miliseconds / 1000));
	total_minutes = parseInt(Math.floor(total_seconds / 60));
	total_hours = parseInt(Math.floor(total_minutes / 60));
	days = parseInt(Math.floor(total_hours / 24));

	seconds = parseInt(total_seconds % 60);
	minutes = parseInt(total_minutes % 60);
	hours = parseInt(total_hours % 24);

	
	return {
		d: days, h: hours, m: minutes, s: seconds
	};
}

function avatar(msg) {
	if (msg.mentions.users.first() == undefined) {
		var user = msg.author
	} else {
		var user = msg.mentions.users.first()
	}
	const avatarEmbed = new Discord.MessageEmbed()
	avatarEmbed.setColor(0x333333)
	avatarEmbed.setAuthor(user.tag)
	avatarEmbed.setImage(user.displayAvatarURL({
		format: 'png',
		dynamic: true,
		size: 2048
	}));
	msg.channel.send(avatarEmbed);
	return
}

function codeMsg(msg) {
	var code = randomString()
	if (codes.includes(code)) {
		code = randomString()
	}
	const sendPic = pics[Math.floor(Math.random() * pics.length)];
	var sendcode = '```' + code + '```'
	msg1 = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
	msg.author.send(msg1)
	msg.author.send(sendPic)
	return code
}

function getDateObject(existed) {
	data = convertMiliseconds(existed)
	const calculateTimimg = d => {
		let months = 0,
			years = 0,
			days = 0,
			weeks = 0
		while (d) {
			if (d >= 365) {
				years++
				d -= 365
			} else if (d >= 30) {
				months++
				d -= 30
			} else if (d >= 7) {
				weeks++
				d -= 7
			} else {
				days++
				d--
			}
		};
		return {
			years,
			months,
			weeks,
			days
		}
	}

	var returning = {
		y: null,
		m: null,
		w: null,
		d: null,
		h: null,
		mi: null,
		s: null
	}

	returning.s = data.s
	returning.mi = data.m
	returning.h = data.h

	data = calculateTimimg(data.d)

	returning.d = data.days
	returning.w = data.weeks
	returning.m = data.months
	returning.y = data.years

	return returning
}

function timeHandler(existed) {
	dateobj = getDateObject(existed)

	if (dateobj.y > 0) {
		return `Years: ${dateobj.y}, Months: ${dateobj.m}, Weeks: ${dateobj.w}, Days: ${dateobj.d}, Hours: ${dateobj.h}, Minutes: ${dateobj.mi}, Seconds: ${dateobj.s}`
	}
	if (dateobj.m > 0) {
		return `Months: ${dateobj.m}, Weeks: ${dateobj.w}, Days: ${dateobj.d}, Hours: ${dateobj.h}, Minutes: ${dateobj.mi}, Seconds: ${dateobj.s}`
	}
	if (dateobj.w > 0) {
		return `Weeks: ${dateobj.w}, Days: ${dateobj.d}, Hours: ${dateobj.h}, Minutes: ${dateobj.mi}, Seconds: ${dateobj.s}`
	}
	if (dateobj.d > 0) {
		return `Days: ${dateobj.d}, Hours: ${dateobj.h}, Minutes: ${dateobj.mi}, Seconds: ${dateobj.s}`
	}
	if (dateobj.h > 0) {
		return `Hours: ${dateobj.h}, Minutes: ${dateobj.mi}, Seconds: ${dateobj.s}`
	}
	return `Minutes: ${dateobj.mi}, Seconds: ${dateobj.s}`
}

function help(msg, canvote) {
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
		value: '**EXPERIMENTAL**\nThis command is not ready for public use yet.'
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

function addImage(link) {
	pics.push(link)
	saveJSON()
}

function randomString(length = 64) {
	var result = '';
	for (var i = length; i > 0; --i) {
		num = Math.floor(Math.random() * (126 - 33 + 1) + 33)
		result += String.fromCharCode(num)
	}
	return result
}

async function ping(msg) {
	let sent = await msg.channel.send('Loading...')

	var newmsg = `:ping_pong: Pong!\nLatency is ${sent.createdTimestamp - msg.createdTimestamp}ms.\nAPI Latency is ${Math.round(client.ws.ping)} ms`
	sent.edit(newmsg)
}

function filter(msg) {
	if (msg.channel.id == '760831152109649940') {
		return
	}

	words = msg.content.split(' ')
	words.forEach((value) => {
		var words = value.replace(/([^a-zA-z0-9]+)/g, '').toLowerCase()

		if (removing.includes(words)) {
			msg.delete()
			return msg.channel.send(`<@${msg.author.id}>, watch your language!`)
		}
	})
}

function readJSON() {
	var data = fs.readFileSync('json/main.json')
	data = JSON.parse(data)
	data.election.users.forEach(function(item) {
		var decrypted = CryptoJS.AES.decrypt(item, process.env.ENCRYPTION_KEY)
		users.push(decrypted.toString(CryptoJS.enc.Utf8))
	})
	data.election.codes.forEach(function(item) {
		var decrypted = CryptoJS.AES.decrypt(item, process.env.ENCRYPTION_KEY)
		codes.push(decrypted.toString(CryptoJS.enc.Utf8))
	})
	pics = data.images
	removing = data.filterlist
	return 'JSON file read'
}

function saveJSON() {
	var saving = {
		election: {
			users: [],
			codes: []
		},
		images: [],
		filterlist: []
	}
	saving.images = pics
	saving.filterlist = removing
	users.forEach(function(item) {
		var encrypted = CryptoJS.AES.encrypt(item, process.env.ENCRYPTION_KEY)
		saving.election.users.push(encrypted.toString())
	})
	codes.forEach(function(item) {
		var encrypted = CryptoJS.AES.encrypt(item, process.env.ENCRYPTION_KEY)
		saving.election.codes.push(encrypted.toString())
	})
	fs.writeFileSync('json/main.json', JSON.stringify(saving))
}

function getMemberNumber() {
	const guild = client.guilds.cache.get("553718744233541656");
	return guild.memberCount - 7
}

client.on('ready', () => {
	// Set the status
	client.user.setActivity('$help | Watching the GeoFS Events Server', {
		type: 'PLAYING'
	})
})

client.on('guildMemberRemove', member => {
	var embed = new Discord.MessageEmbed()
	embed.setColor('#0099ff')
	embed.setAuthor('Member Left')
	embed.setDescription(`${member} ${member.user.tag}`)
	embed.setFooter(`ID: ${member.id}`)
	embed.setTimestamp()
	client.channels.cache.get('753568398440398969').send(embed)
})

client.on('guildMemberAdd', member => {
	existed = Date.now() - member.user.createdAt
	existed = timeHandler(existed)
	member.roles.set(['752701923399958610', '553723645265182720'])
	ageembed = new Discord.MessageEmbed()
	ageembed.setColor('#0099ff')
	ageembed.setAuthor('Member Joined')
	ageembed.setDescription(`${member} ${member.user.tag}`)
	ageembed.addField('**Account Age**', `${existed}`)
	ageembed.setFooter(`ID: ${member.id}`)
	ageembed.setTimestamp()
	client.channels.cache.get('753568398440398969').send(ageembed)
	client.channels.cache.get('553733333234876426').send(`Welcome to GeoFS Events ${member}! Please read the <#553929583397961740> and <#553720929063141379>, and then ping an online Elite Crew member to let you in!`)
})

client.on('message', async (msg) => {
	if (msg.author.bot) {
		return
	}

	await filter(msg)

	try {
		if (typeof msg.mentions.members.first() !== undefined) {
			if (msg.mentions.members.first().user.id === '780458120605990954') {
				newmsg = 'Hello! My command prefix is `$`\nIf you want to get a list of commands you can run `$help`'
				msg.channel.send(newmsg)
			}
		}
	} catch (e) {}

	if (!msg.content.startsWith('$')) {
		return
	}
	var canvote = false

	if (msg.content.startsWith('$addimage')) {
		if (msg.member.roles.cache.has("766386531681435678")) {
			if (msg.attachments.size > 0) {
				var Attachment = (msg.attachments).array()
				addImage(Attachment[0].url)
				await msg.channel.send('Image added. Restarting.')
				process.exit()
			}
			return msg.channel.send(`${msg.author}, you need to attatch an image!`)
		}
		return msg.channel.send(`${msg.author}, you can't run that command!`)
	}

	if (msg.content.startsWith('$restart') || msg.content.startsWith('$reload')) {
		if (msg.author.id == '550456900861427733') {
			await msg.channel.send('Restarting. See you soon!')
			process.exit()
		}
		return msg.channel.send(`<@${msg.author.id}>, you can't restart me!`)
	}

	if (msg.content.startsWith('$ping')) {
		ping(msg)
		return
	}
	if (msg.content.startsWith('$av')) {
		avatar(msg)
		return
	}
	if (msg.content.startsWith('$help')) {
		help(msg, canvote)
		return
	}
	if (msg.content.startsWith('$membercount')) {
		return msg.channel.send(`There are ${getMemberNumber()} members in the server.`)
	}
	if (msg.content.startsWith('$code')) {
		return msg.channel.send(`${msg.author}, there is no running election!`)

		if (canvote) {
			if (users.includes(msg.author.id)) {
				return msg.channel.send(`<@${msg.author.id}>, you've already gotten a code!`)
			}
			code = codeMsg(msg)
			codes.push(code)
			users.push(msg.author.id)
			saveJSON()
			return msg.channel.send(`${msg.author},  check your dm's!`)
		}
		return msg.channel.send(`${msg.author}, you can't vote right now!`)
	}
	if (msg.content.startsWith('$approve')) {
		if (msg.member.roles.cache.has("766386531681435678")) {
			if (msg.mentions.members.first() == undefined) {
				return msg.channel.send(`<@${msg.author.id}>, you have to mention someone!`)
			}
			let member = msg.mentions.members.first()
			if (member.roles.cache.some(role => role.name === 'Security Check')) {
				member.roles.set(['553723642568114187'])
				var message = `Welcome to GeoFS Events ${member}!\nWe hope you enjoy your stay!\nPlease make sure you have read <#553929583397961740> and <#553720929063141379>.\nWe organize and host events every day, so make sure to check <#756937922904850442> to keep up on events hosted for that day.\nThere are currently ${getMemberNumber()} people in this server.\nIf you need any help or advice, contact the Elite Crew.\nUse <#717777238979903566> to put your event ideas in and we will do it as soon as possible!\n\nCheck out and subscribe to our channel here: <https://www.youtube.com/channel/UCZhJvrv8C6mb0FXENg6uh2w>`
				client.channels.cache.get('553718744657035274').send(message)
				return msg.channel.send('User approved sucessfully')
			}
			return msg.channel.send("That didn't work.")
		}
		return msg.channel.send(`<@${msg.author.id}>, you can't run that command!`)
	}
	if (msg.content.startsWith('$questioning')) {
		if (msg.member.roles.cache.has("766386531681435678")) {
			if (msg.mentions.members.first() == undefined) {
				return msg.channel.send(`<@${msg.author.id}>, you have to mention someone!`)
			}
			let member = msg.mentions.members.first()
			if (member.roles.cache.has("766386531681435678")) {
				return msg.channel.send("That user can't be sent to the questioning room!")
			} else {
				let rolenames = []
				let roles = member.roles.member._roles
				roles.forEach(function(item) {
					let role = msg.guild.roles.cache.get(item)
					rolenames.push(role.name)
				})
				client.channels.cache.get('760831152109649940').send(`${member} had roles ${rolenames.join(', ')}`)
				member.roles.set(['762663566531624980'])
				client.channels.cache.get('767050317362757741').send(`<@${member.id}>, you've been sent to the questioning room.`)
				return msg.channel.send(`${member} has been sent to the questioning room`)
			}
			return msg.channel.send("That didn't work.")
		}
		return msg.channel.send(`<@${msg.author.id}>, you can't run that command!`)
	}
	return msg.channel.send(`Seems like that isn't a command!`)
})

console.log('Running minified code.')

client.on("error", (e) => console.error(e))
client.on("warn", (e) => console.warn(e))
// client.on("debug", (e) => console.info(e))

console.log(readJSON())

client.login(process.env.TOKEN);

const http = require('http');
const server = http.createServer((req, res) => {
	res.writeHead(200);
	res.end('ok');
});
server.listen(3000);