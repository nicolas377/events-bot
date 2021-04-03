const express = require('express') //Set up the express module
starttime = Date.now()
const app = express()
const router = express.Router()
const path = require('path') //Include the Path module

//Set up the Express router
router.get('/', function(req, res) {
	res.redirect('/index')
})

//Navigate your website
router.get('/index', function(req, res) {
	res.sendFile(path.join(__dirname, '/index.html'))
})
router.get('/help', function(req, res) {
	res.redirect('/index')
	/*res.sendFile(path.join(__dirname, '/help.html'))*/
})
router.get('/404', function(req, res){
	res.status(404)
	res.sendFile(__dirname + '/404.html')
})
router.get('/uptime', function(req, res){
	min = (Date.now()-starttime)/60000
	min = (Math.round(min*100))/100
	res.status(200)
	res.end(`<a href="https://events-bot.nrod06.repl.co/index">Back to home</a>\nI've been running for ${min} minutes! (that's ${Math.round((Date.now()-starttime)/1000)} seconds)`)
})
app.use('/', router)
app.use('/uptime', router)
app.use('/index', router)
app.use('/404', router)
//404 Redirect
app.use(function(req, res, next) {
	res.redirect('/404')
})

//set up the Express server to listen on port 3000 and logs some messages when the server is ready
let server = app.listen(3000, function() {
	logger("App server is running.", true)
})