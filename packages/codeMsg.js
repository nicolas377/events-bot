exports.codeMsg = function(msg) {
	var code = randomString()
	if (codes.includes(code)) {
		code = randomString()
	}
	const sendPic = pics[Math.floor(Math.random() * pics.length)];
	var sendcode = '```' + code + '```'
	msg1 = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
	msg.author.send(msg1)
	msg.author.send(sendPic)
	return code
}