const Discord = require('discord.js')
const CryptoJS = require('crypto-js')
const fs = require('fs')

exports.saveJSON = () => {
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