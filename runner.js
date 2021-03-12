const UglifyJS = require("uglify-js")
const fs = require('fs')

function logger(txt, log = false) {
	var date = new Date(Date.now()).toUTCString()
	fs.appendFileSync('log.txt', `\n${date}: ${txt}`)
	if (log) {
		console.log(txt)
	}
}

var minifiedcode = UglifyJS.minify(fs.readFileSync("source.js", "utf-8"))

fs.writeFileSync('index.min.js', minifiedcode.code)

logger('Code minified. Getting ready to run.', true)

require('./index.min.js')

logger('Running minified code.', true)