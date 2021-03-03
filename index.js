const Discord = require('discord.js');
const client = new Discord.Client();
const CryptoJS = require('crypto-js')
const fs = require('fs');
var users = []
var codes = []
var pics = null
var removing = null

// define the functions

function dhm(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }

	string = `Days: ${d}, Hours: ${h}, Minutes: ${m}`
  return string
}

function avatar(msg) {
  if (msg.mentions.users.first() == undefined) {
    user = msg.author
  } else {
    user = msg.mentions.users.first()
  }
  const avatarEmbed = new Discord.MessageEmbed()
  avatarEmbed.setColor(0x333333)
  avatarEmbed.setAuthor(user.tag)
  avatarEmbed.setImage(user.displayAvatarURL());
  msg.channel.send(avatarEmbed);
  delete(user)
  return
}

function createCodeMsg(msg)	{
	var code = randomString()
	if (codes.includes(code))	{
		delete(code)
		var code = randomString()
	}
  const sendPic = pics[Math.floor(Math.random() * pics.length)];
	var sendcode = '```'+code+'```'
  msg1 = "**ELECTION INSTRUCTIONS**"
  msg2 = `Step 1: Copy this ${sendcode}\nStep 2: Go to this link. <https://docs.google.com/forms/d/e/1FAIpQLSfG3-Hoa0cydMMPNS3i62k_WSDiVfmnLs5jnKDfNCjcJ5_eAA/viewform>\n\nStep 3: Follow the prompts in the form`
	msgSender(msg1, msg.author)
	msgSender(msg2, msg.author)
	msgSender(sendPic, msg.author)
	return code
}

function help(msg) {
	const embed = new Discord.MessageEmbed()
	embed.setColor('#0099ff')
	embed.setTitle('Events Bot Help')
	embed.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
	embed.setAuthor(msg.author.tag)
	embed.addFields(
		{ name: '\n$ping', value: 'Gets the latency from message sending to message repsonse' },
		{ name: '$av', value: "Gets the avatar of the mentioned user if they're in the server. Defaults to the person sending the msg." },
		{ name: '$help', value: 'This command' }
	)
	if (msg.member.roles.cache.some(role => role.name === 'Election Boi')) {
		embed.addField('$code',"Election command. DM's the user the election code, along with the instructions for to vote.")
	}
	if (msg.member.roles.cache.some(role => role.name === 'Bot mod')) {
		embed.addField('$approve', 'Gives a user in the waiting room the Junior Pilot role and sends a welcome message.')
		embed.addField('$questioning', "Logs all the roles of the user, then overwrites the user's roles with the questioning role.")
	}
	embed.setImage(pics[Math.floor(Math.random() * pics.length)])
	embed.setTimestamp()
	msg.channel.send(embed)
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
	
	var newmsg = `:ping_pong: Latency is ${sent.createdTimestamp - msg.createdTimestamp}ms.\nAPI Latency is ${Math.round(client.ws.ping)} ms`
	sent.edit(newmsg)
}

async function filter(msg) {
	var message = msg.toLowerCase()
}

function readJSON() {
	var data = fs.readFileSync('json/main.json')
	data = JSON.parse(data)
	data.election.users.forEach(function (item) {
		var decrypted = CryptoJS.AES.decrypt(item, process.env.ENCRYPTION_KEY)
		users.push(decrypted.toString(CryptoJS.enc.Utf8))
	})
	data.election.codes.forEach(function (item) {
		var decrypted = CryptoJS.AES.decrypt(item, process.env.ENCRYPTION_KEY)
		codes.push(decrypted.toString(CryptoJS.enc.Utf8))
	})
	pics = data.images
	removing = data.filterlist
}

function saveJSON() {
	var saving = {election: {users: [], codes: []}, images: []}
	saving.images = pics
	users.forEach(function (item) {
		var encrypted = CryptoJS.AES.encrypt(item, process.env.ENCRYPTION_KEY)
		saving.election.users.push(encrypted.toString())
	})
	codes.forEach(function (item) {
		var encrypted = CryptoJS.AES.encrypt(item, process.env.ENCRYPTION_KEY)
		saving.election.codes.push(encrypted.toString())
	})
	fs.writeFileSync('json/main.json', JSON.stringify(saving))
}

function getMemberNumber() {
	const guild = client.guilds.cache.get("553718744233541656");
	return guild.memberCount
}

// done

client.on('ready', () => {
	// Set the status
	client.user.setActivity('$help | Watching the GeoFS Events server', { type: 'Playing'})
})

/*client.on('guildMemberRemove', member => {
	try {
		console.log(member.roles.member.guild._roles)
	}
	catch (e) {
		console.warn(e)
	}
})*/

client.on('guildMemberAdd', member => {
	existed = Date.now() - member.user.createdAt
	existed = dhm(existed)
	member.roles.set(['752701923399958610', '553723645265182720'])
	ageembed = new Discord.MessageEmbed()
	ageembed.setColor('#0099ff')
	ageembed.setAuthor('Member Joined')
	ageembed.setDescription(`<@${member.id}> ${member.user.tag}`)
	ageembed.addField('**Account Age**', `${existed}`)
	ageembed.setFooter(`ID: ${member.id}`)
	ageembed.setTimestamp()
	client.channels.cache.get('753568398440398969').send(ageembed)
	client.channels.cache.get('553733333234876426').send(`Welcome to GeoFS Events <@${member.id}>! Please read the <#553929583397961740> and <#553720929063141379>, and then ping an online Elite Crew member to let you in!`)
})

client.on('disconnect', () => {
	process.exit()
})

client.on('message', (msg) => {
	/*if (msg.mentions.members.first() !== undefined) {
		if (msg.mentions.members.members.first().id === '780458120605990954') {
			console.log("yes")
		}
	}*/
	if (!msg.content.startsWith('$'))	{
		return
	}
	// Can the user vote?
	if (msg.member.roles.cache.some(role => role.name === 'Election Boi'))	{
		canvote = true
	}	else	{
		canvote = false
	}

	if (msg.content.startsWith('$ping'))	{
		ping(msg)
		return
	}
	if (msg.content.startsWith('$av'))	{
		avatar(msg)
		return
	}
	if (msg.content.startsWith('$help')) {
		help(msg)
		return
	}
	if (msg.content.startsWith('$code')) {
		if (canvote) {
			if (users.includes(msg.author.id)) {
				return msg.channel.send(`<@${msg.author.id}>, you've already gotten a code!`)
			}
			code = createCodeMsg(msg)
			codes.push(code)
			users.push(msg.author.id)
			saveJSON()
			return msg.channel.send(`<@${msg.author.id}>, check your dm's for instructions!`)
		}
		return msg.channel.send(`<@${msg.author.id}>, you can't run that command!`)
	}
	if (msg.content.startsWith('$approve')) {
		if (msg.member.roles.cache.has("766386531681435678")) {
			if (msg.mentions.members.first() == undefined) {
				return msg.channel.send(`<@${msg.author.id}>, you have to mention someone!`)
			}
			let member = msg.mentions.members.first()
			if (member.roles.cache.some(role => role.name === 'Security Check')) {
				member.roles.set(['553723642568114187'])
				var message = `Welcome to GeoFS Events <@${member.id}>!\nWe hope you enjoy your stay!\nPlease make sure you have read <#553929583397961740> and <#553720929063141379>.\nWe organize and host events every day, so make sure to check <#756937922904850442> to keep up on events hosted for that day.\nThere are currently ${getMemberNumber()} people in this server.\nIf you need any help or advice, contact the Elite Crew.\nUse <#717777238979903566> to put your event ideas in and we will do it as soon as possible!\n\nCheck out and subscribe to our channel here: <https://www.youtube.com/channel/UCZhJvrv8C6mb0FXENg6uh2w>`
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
			}	else {
				let rolenames = []
				let roles = member.roles.member._roles
				roles.forEach(function (item) {
					let role = msg.guild.roles.cache.get(item)
					rolenames.push(role.name)
				})
				client.channels.cache.get('760831152109649940').send(`<@${member.id}> had roles ${rolenames.join(', ')}`)
				member.roles.set(['762663566531624980'])
				return msg.channel.send(`<@${member.id}> has been sent to the questioning room`)
			}
			return msg.channel.send("That didn't work")
		}
		return msg.channel.send(`<@${msg.author.id}>, you can't run that command!`)
	}
	delete(canvote)
})

client.on("error", (e) => console.error(e))
client.on("warn", (e) => console.warn(e))
client.on("debug", (e) => console.info(e))

readJSON()

// console.log(codes)

client.login(process.env.CLIENT_TOKEN);

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);
setTimeout(function () {
	console.clear()
}, 2000)