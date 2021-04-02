const CryptoJS = require('crypto-js')
const fs = require('fs')

exports.readJSON = function() {
	var data = fs.readFileSync('./main.json')
	data = JSON.parse(data)
	data.election.users.forEach(function(item) {
		var decrypted = CryptoJS.AES.decrypt(item, process.env.ENCRYPTION_KEY)
		users.push(decrypted.toString(CryptoJS.enc.Utf8))
	})
	data.election.codes.forEach(function(item) {
		var decrypted = CryptoJS.AES.decrypt(item, process.env.ENCRYPTION_KEY)
		codes.push(decrypted.toString(CryptoJS.enc.Utf8))
	})
	pics = data.images
	removing = data.filterlist
	// read in the key-value pairs
	timezonesJSON = data.timezones
	timezones = []
	// put each pair into an object
	for (const [key, value] of Object.entries(timezonesJSON)) {
  	let i = {id: key, ianaTz: value}
		// and push it to the new array
		timezones.push(i)
	}

	return
}
