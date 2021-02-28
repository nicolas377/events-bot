const Discord = require('discord.js');
const client = new Discord.Client();
const Database = require("@replit/database")
const db = new Database()
const CryptoJS = require('crypto-js')
const fs = require('fs');
var users = []
var codes = []

function readImages() {
	var raw = fs.readFileSync('images.json')
	var pics = JSON.parse(raw).images
	return pics
}

var pics = readImages()

function randomString(length = 64) {
  var result = '';
  for (var i = length; i > 0; --i) {
    num = Math.floor(Math.random() * (126 - 33 + 1) + 33)
    result += String.fromCharCode(num)
  }
  return result
}

function saveJSON() {
	var saving = {users: [], codes: []}
	users.forEach(function (item) {
		var encrypted = CryptoJS.AES.encrypt(item, process.env.ENCRYPTION_KEY)
		saving.users.push(encrypted.toString())
	})
	codes.forEach(function (item) {
		var encrypted = CryptoJS.AES.encrypt(item, process.env.ENCRYPTION_KEY)
		saving.codes.push(encrypted.toString())
	})
	fs.writeFileSync('data.json', JSON.stringify(saving))
}

function readJSON() {
	var data = fs.readFileSync('data.json')
	data = JSON.parse(data)
	data.users.forEach(function (item) {
		var decrypted = CryptoJS.AES.decrypt(item, process.env.ENCRYPTION_KEY)
		users.push(decrypted.toString(CryptoJS.enc.Utf8))
	})
	data.codes.forEach(function (item) {
		var decrypted = CryptoJS.AES.decrypt(item, process.env.ENCRYPTION_KEY)
		codes.push(decrypted.toString(CryptoJS.enc.Utf8))
	})
}

function createEmbed(person, code) {
  code = '```' + code + '```'
  const sendPic = pics[Math.floor(Math.random() * pics.length)];
  msg1 = "**ELECTION INSTRUCTIONS**"
  msg2 = `Step 1: Copy this ${code}\nStep 2: Go to this link. <https://docs.google.com/forms/d/e/1FAIpQLSfG3-Hoa0cydMMPNS3i62k_WSDiVfmnLs5jnKDfNCjcJ5_eAA/viewform>\n\nStep 3: Follow the prompts in the form`
  person.send(msg1);
  person.send(msg2);
  person.send(sendPic);
}

function electioncode(author, msg) {
	if (msg.member.roles.cache.find(r => r.name === "Election Boi")) {
    if (users.includes(author.id)) {
      return
    }
    str = randomString()
    if (codes.includes(str)) {
      delete (str)
      str = randomString()
    }
    createEmbed(author, str)
    codes.push(str)
    users.push(author.id)
		saveJSON()
  }
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

client.on('message', msg => {
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

readJSON()

client.login(process.env.CLIENT_TOKEN);

client.on('ready', () => {
	client.user.setActivity('the GeoFS Events server', { type: 'WATCHING'})
})

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);