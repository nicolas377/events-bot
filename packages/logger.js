const fs = require('fs')

exports.logger = function(txt, log = false) {
	var date = new Date(Date.now()).toUTCString()
	fs.appendFileSync('log.txt', `\n${date}: ${txt}`)
	if (log) {
		console.log(txt)
	}
}