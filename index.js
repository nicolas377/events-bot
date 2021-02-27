const Discord = require('discord.js');
const client = new Discord.Client();
const Database = require("@replit/database")
const db = new Database()
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
  if (msg.content === '$code') {
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
    }
  }
});

client.login(process.env.CLIENT_TOKEN);

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);
