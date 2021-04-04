const CryptoJS = require('crypto-js')
const fs = require('fs')

exports.saveJSON = () => {
	var saving = {
		election: {
			users: [],
			codes: []
		},
		timezones: {},
		images: [],
		filterlist: []
	}
	saving.images = pics
	saving.filterlist = removing
	saving.timezones = timezones
	users.forEach(function(item) {
		var encrypted = CryptoJS.AES.encrypt(item, process.env.ENCRYPTION_KEY)
		saving.election.users.push(encrypted.toString())
	})
	codes.forEach(function(item) {
		var encrypted = CryptoJS.AES.encrypt(item, process.env.ENCRYPTION_KEY)
		saving.election.codes.push(encrypted.toString())
	})
	fs.writeFileSync('./main.json', JSON.stringify(saving, null, "\t"))
}