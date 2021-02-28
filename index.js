const Discord = require('discord.js');
const client = new Discord.Client();
const CryptoJS = require('crypto-js')
const fs = require('fs');
var users = []
var codes = []
var pics = null

// define the functions

function createCodeMsg(msg)	{
	var code = randomString()
	if (codes.includes(code))	{
		delete(code)
		var code = randomString()
	}
  const sendPic = pics[Math.floor(Math.random() * pics.length)];
  msg1 = "**ELECTION INSTRUCTIONS**"
  msg2 = `Step 1: Copy this ${code}\nStep 2: Go to this link. <https://docs.google.com/forms/d/e/1FAIpQLSfG3-Hoa0cydMMPNS3i62k_WSDiVfmnLs5jnKDfNCjcJ5_eAA/viewform>\n\nStep 3: Follow the prompts in the form`
	messageSender(msg1, msg.author)
	messageSender(msg2, msg.author)
	messageSender(sendPic, msg.author)
}

function help(msg) {
	const embed = new Discord.MessageEmbed()
	embed.setColor('#0099ff')
	embed.setTitle('Events Bot Help')
	embed.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
	embed.setAuthor(msg.author.tag)
	embed.addFields(
		{ name: '\n$ping', value: 'Gets the latency from message sending to message repsonse' },
		{ name: '$av', value: "Gets the avatar of the mentioned user if they're in the server. Defaults to the person sending the message." },
		{ name: '$code', value: "Election command. DM's the user the election code, along with the instructions for to vote. Only runs on the Election Boi role as of now."},
		{ name: '$help', value: 'This command' }
	)
	embed.setImage(pics[Math.floor(Math.random() * pics.length)])
	embed.setTimestamp()
	return embed
}

function randomString(length = 64) {
	var result = '';
  for (var i = length; i > 0; --i) {
    num = Math.floor(Math.random() * (126 - 33 + 1) + 33)
    result += String.fromCharCode(num)
  }
  return result
}

function messageSender(message, dest) {
	dest.send(message)
}

function ping(msg) {
	msg.channel.send(`:ping_pong: Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
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

// done

client.on('ready', () => {
	// Set the status
	client.user.setActivity('the GeoFS Events server', { type: 'WATCHING'})
})

client.on('message', (msg) => {
	if (!msg.content.startsWith('$'))	{
		// Only keep running if the message starts with $
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

	delete(canvote)
})

/*client.on('message', msg => {
	if (msg.content.startsWith('$help')) {
		var mess = help(msg)
		msg.channel.send(mess)
		return
	}
	if (msg.content.startsWith('$ping')) {
		msg.channel.send(`:ping_pong: Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
		return
	}
	if (msg.content.startsWith('$av')) {
		let guild = client.guilds.cache.get('553718744233541656')
		if (msg.mentions.users.first() == undefined) {
			user = msg.author
		}	else {
			user = msg.mentions.users.first()
		}
		if (guild.member(user)) {
			const avatarEmbed = new Discord.MessageEmbed()
    	avatarEmbed.setColor(0x333333)
    	avatarEmbed.setAuthor(user.tag)
    	avatarEmbed.setImage(user.displayAvatarURL());
			msg.channel.send(avatarEmbed);
		} else {
			msg.channel.send(`<@${msg.author.id}>, that user isn't in this server!`)
		}
		delete(user)
		return
	}
  if (msg.content.startsWith('$code')) {
    electioncode(msg.author, msg)
		return
  }
});

readJSON()*/

client.login(process.env.CLIENT_TOKEN);

/*const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);*/