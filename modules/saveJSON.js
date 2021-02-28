exports.saveJSON = function () {
	var saving = {election: {users: [], codes: []}, images: []}
	saving.images = pics
	users.forEach(function (item) {
		var encrypted = CryptoJS.AES.encrypt(item, process.env.ENCRYPTION_KEY)
		saving.election.users.push(encrypted.toString())
	})
	codes.forEach(function (item) {
		var encrypted = CryptoJS.AES.encrypt(item, process.env.ENCRYPTION_KEY)
		saving.election.codes.push(encrypted.toString())
	})
	fs.writeFileSync('json/main.json', JSON.stringify(saving))
}