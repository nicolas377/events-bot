const Discord = require('discord.js')
const CryptoJS = require('crypto-js')
const fs = require('fs')
const client = new Discord.Client()
var users = []
var codes = []
var pics = null
var removing = null

// define the functions

function grabPackageFunction(ref) {
	return require(ref)[Object.keys(require(ref))[0]]
}

const avatar = grabPackageFunction('./packages/avatar')
const codeMsg = grabPackageFunction('./packages/codeMsg')
const timeHandler = grabPackageFunction('./packages/timehandler')
const help = grabPackageFunction('./packages/help')
const electioninfo = grabPackageFunction('./packages/electioninfo')
const logger = grabPackageFunction('./packages/logger')
const addImage = grabPackageFunction('./packages/addImage')
const randomString = grabPackageFunction('./packages/randomString')
const ping = grabPackageFunction('./packages/ping')
const filter = grabPackageFunction('./packages/filter')
const readJSON = grabPackageFunction('./packages/json/readJSON')
const saveJSON = grabPackageFunction('./packages/json/saveJSON')
const getMemberNumber = grabPackageFunction('./packages/memberNumber')
const userinfo = grabPackageFunction('./packages/userinfo')

client.on('ready', () => {
	// Set the status
	client.user.setActivity('$help | Watching the GeoFS Events Server', {
		type: 'PLAYING'
	})
})

client.on('guildMemberRemove', member => {
	var embed = new Discord.MessageEmbed()
	embed.setColor('#d94c4c')
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

	var del = await filter(msg)

	if (del) {
		msg.delete()
		msg.channel.send(`${msg.author}, watch your language!`)
	}

	try {
		if (msg.content == '<@780458120605990954>') {
			var sendingmsg = 'Hello! My command prefix is `$`\nIf you want to get a list of commands you can run `$help`'
			return msg.channel.send(sendingmsg)
		}
	} catch (error) {
		logger(`ERROR: ${error}`)
	}

	if (!msg.content.startsWith('$')) {
		return
	}
	var canvote = false

	if (msg.content.startsWith('$electioninfo')) {
		electioninfo(msg)
		return
	}

	if (msg.content.startsWith('$user')) {
		return msg.channel.send(userinfo(msg))
	}

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
		return msg.channel.send(`There are ${getMemberNumber(msg)} members in the server.`)
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
				var message = `Welcome to GeoFS Events ${member}!\nWe hope you enjoy your stay!\nPlease make sure you have read <#553929583397961740> and <#553720929063141379>.\nWe organize and host events every day, so make sure to check <#756937922904850442> to keep up on events hosted for that day.\nThere are currently ${getMemberNumber(msg)} people in this server.\nIf you need any help or advice, contact the Elite Crew.\nUse <#818115761843339274> to put your event ideas in and we will do it as soon as possible!\n\nCheck out and subscribe to our channel here: <https://www.youtube.com/channel/UCZhJvrv8C6mb0FXENg6uh2w>`
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
		}
		return msg.channel.send(`<@${msg.author.id}>, you can't run that command!`)
	}
	return msg.channel.send(`Seems like that isn't a command!`)
})

client.on("error", async (e) => {
	await client.channels.cache.get('815629216372621373').send(`The bot ran into an error and needs to restart. ${e}`)
	await logger(`ERROR ${e}`, true)
	process.exit(1)
})
client.on("warn", (e) => logger(`WARNING: ${e}`, true))
// client.on("debug", (e) => logger(`DEBUG: ${e}`)

readJSON()

client.login(process.env.TOKEN);

const http = require('http');
const server = http.createServer((request, response) => {
	response.writeHead(200);
	response.end('ok');
});
server.listen(3000);

setInterval(() => {
	logger('Still working.')
}, 900000)

// since you've made it this far, you've been distracted.
// now go do whatever it is you were doing before