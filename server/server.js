const express = require('express') //Set up the express module
starttime = Date.now()
const app = express()
const router = express.Router()
const path = require('path') //Include the Path module

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

router.get('/', function(req, res) {
	res.redirect('/index')
})
router.get('/index', function(req, res) {
	res.sendFile(path.join(__dirname, '/index.html'))
})
router.get('/help', function(req, res) {
	res.sendFile(path.join(__dirname, '/help.html'))
})
router.get('/404', function(req, res){
	res.status(404)
	res.sendFile(__dirname + '/404.html')
})
router.get('/uptime', function(req, res){
	res.render('uptime', {
		min: (Math.round((Date.now()-starttime)/60000)),
		sec: Math.round((Date.now()-starttime)/1000)
	})
})

app.use('/', router)
app.use('/uptime', router)
app.use('/index', router)
app.use('/404', router)
app.use('/static', express.static(path.join(__dirname, 'public')))
//404 Redirect
/*app.use(function(req, res) {
	res.redirect('/404')
})*/



app.listen(3000)
logger("App server is running.", true)