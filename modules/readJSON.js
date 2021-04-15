const CryptoJS = require('crypto-js')
const fs = require('fs')

function decrypt(item) {
	return CryptoJS.AES.decrypt(item, process.env['ENCRYPTION_KEY'])
}

exports.readJSON = function() {
	var data = fs.readFileSync('./main.json')
	data = JSON.parse(data)
	data.election.users.forEach(function(item) {
		var decrypted = decrypt(item)
		users.push(decrypted.toString(CryptoJS.enc.Utf8))
	})
	data.election.codes.forEach(function(item) {
		var decrypted = decrypt(item)
		codes.push(decrypted.toString(CryptoJS.enc.Utf8))
	})
	pics = data.images
	removing = data.filterlist
	timezones = data.timezones
	events = data.events
	botStatuses = data.statuses
}
