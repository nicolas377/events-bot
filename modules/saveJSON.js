const CryptoJS = require('crypto-js')
const fs = require('fs')

function encrypt(item) {
	return CryptoJS.AES.encrypt(item, process.env['ENCRYPTION_KEY'])
}

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
	saving.statuses = botStatuses
	users.forEach(function(item) {
		var encrypted = encrypt(item)
		saving.election.users.push(encrypted.toString())
	})
	codes.forEach(function(item) {
		var encrypted = encrypt(item)
		saving.election.codes.push(encrypted.toString())
	})
	fs.writeFileSync('./main.json', JSON.stringify(saving, null, "\t"))
}
