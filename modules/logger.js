const fs = require('fs')

exports.logger = function(txt, log = false) {
	var date = Date.now()
	fs.appendFileSync('log.txt', `\n${date}: ${txt}`)
	if (log) {
		console.log(txt)
	}
}