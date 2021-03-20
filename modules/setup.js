module.exports = function() {
	global.Discord = require('discord.js')
	global.CryptoJS = require('crypto-js')
	global.fs = require('fs')
	global.client = new Discord.Client()
	global.users = []
	global.codes = []
	global.pics = null
	global.removing = null
}