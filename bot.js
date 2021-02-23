const Discord = require('discord.js');
const client = new Discord.Client();
var codes = []
var users = []

function randomString(length = 64) {
    var result = '';
    for (var i = length; i > 0; --i) {
      num = Math.floor(Math.random() * (126 - 33 + 1) + 33)
      result += String.fromCharCode(num)
    }
    return result
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '$code') {
    str = randomString()
    users.push(msg.author.id)
    codes.push(str)
    str = '```' + str + '```'
    msg.author.send(str);
    client.users.fetch('550456900861427733').then((user) => {
    user.send("New Code: "+str);
    });
    console.log(users);
    console.log(codes);
  }
});

client.login('NzgwNDU4MTIwNjA1OTkwOTU0.X7vYRA.4KACYErUrPt564RELap375DywQ8');
