const Discord = require('discord.js');
const client = new Discord.Client();
fs = require('fs')

function randomString(length = 64) {
    var result = '';
    for (var i = length; i > 0; --i) {
      num = Math.floor(Math.random() * (126 - 33 + 1) + 33)
      result += String.fromCharCode(num)
    }
    return result
}

function updateFiles() {
  fs.writeFile('./json/codes.json', JSON.stringify(codes), function (err) {
    if (err) {
      return console.log(err);
    }
  })
  fs.writeFile('./json/users.json', JSON.stringify(users), function (err) {
    if (err) {
      return console.log(err);
    }
  })
}

function readFiles() {
  let rawcodes = fs.readFileSync('./json/codes.json')
  codes = JSON.parse(rawcodes)

  let rawusers = fs.readFileSync('./json/users.json')
  users = JSON.parse(rawusers)
}

client.on('ready', () => {
  readFiles()
  console.log(`Ready`);
});

client.on('message', msg => {
  if (msg.content === '$code') {
    if(msg.member.roles.cache.find(r => r.name === "Election Boi")) {
      str = randomString()
      if (codes.includes(str)) {
        delete(str)
        str = randomString()
      }
      users.push(msg.author.id)
      codes.push(str)
      updateFiles()
      str = '```' + str + '```'
      msg.author.send(str);
      console.log("New code created")
    }
  }
});

client.login('NzgwNDU4MTIwNjA1OTkwOTU0.X7vYRA.QSlX3-cbPqrGfzSn5MxX1QOis8M');
