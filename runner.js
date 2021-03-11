const UglifyJS = require("uglify-js")
const fs = require('fs')

var minifiedcode = UglifyJS.minify(fs.readFileSync("source.js", "utf-8"))

fs.writeFileSync('index.min.js', minifiedcode.code)

console.log('Code minified. Getting ready to run.')

require('./index.min.js')

console.log('Running minified code.')	