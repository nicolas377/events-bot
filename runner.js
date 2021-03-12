const UglifyJS = require("uglify-js")
const fs = require('fs')

function logger(txt, newline = true) {
	var date = new Date(Date.now()).toUTCString()
	if (newline) {
		appendtext = `\n${date}: ${txt}`
	} else {
		appendtext = `${date}: ${txt}`
	}
	fs.appendFileSync('log.txt', appendtext)
	console.log(txt)
}

var minifiedcode = UglifyJS.minify(fs.readFileSync("source.js", "utf-8"))

fs.writeFileSync('index.min.js', minifiedcode.code)

logger('Code minified. Getting ready to run.')

require('./index.min.js')

logger('Running minified code.')