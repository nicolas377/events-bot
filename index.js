const Discord = require('discord.js');
const client = new Discord.Client();
const Database = require("@replit/database")
const db = new Database()
const CryptoJS = require('crypto-js')
const fs = require('fs');
var users = []
var codes = []

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
  var pics = ['https://cdn.discordapp.com/attachments/553718744657035274/815039884849840128/unknown.png', 'https://cdn.discordapp.com/attachments/553718744657035274/815040081282203668/unknown.png', 'https://cdn.discordapp.com/attachments/553718744657035274/815040311205691412/unknown.png', 'https://cdn.discordapp.com/attachments/553718744657035274/815040405044723732/unknown.png', 'https://cdn.discordapp.com/attachments/553718744657035274/815040713234055229/unknown.png', 'https://cdn.discordapp.com/attachments/553718744657035274/815040980545175582/unknown.png']
  const sendPic = pics[Math.floor(Math.random() * pics.length)];
  msg1 = "**ELECTION INSTRUCTIONS**"
  msg2 = `Step 1: Copy this ${code}\nStep 2: Go to this link. <https://docs.google.com/forms/d/e/1FAIpQLSfG3-Hoa0cydMMPNS3i62k_WSDiVfmnLs5jnKDfNCjcJ5_eAA/viewform>\n\nStep 3: Follow the prompts in the form`
  person.send(msg1);
  person.send(msg2);
  person.send(sendPic);
}

client.on('message', msg => {
	if (msg.content.startsWith('$av')) {
		let guild = client.guilds.cache.get('553718744233541656')
		if (msg.mentions.users.first() == undefined) {
			var user = msg.author
		}	else {
			var user = msg.mentions.users.first()
		}
		if (guild.member(user)) {
			const avatarEmbed = new Discord.MessageEmbed()
    	avatarEmbed.setColor(0x333333)
    	avatarEmbed.setAuthor(user.username)
    	avatarEmbed.setImage(user.displayAvatarURL());
			msg.channel.send(avatarEmbed);
		} else {
			msg.channel.send(`<@${msg.author.id}>, that user isn't in this server!`)
		}
	}
  if (msg.content.startsWith('$code')) {
    if (msg.member.roles.cache.find(r => r.name === "Election Boi")) {
      if (users.includes(msg.author.id)) {
        return
      }
      str = randomString()
      if (codes.includes(str)) {
        delete (str)
        str = randomString()
      }
      createEmbed(msg.author, str)
      codes.push(str)
      users.push(msg.author.id)
			saveJSON()
    }
  }
});

readJSON()

client.login(process.env.CLIENT_TOKEN);

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);