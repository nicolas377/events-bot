exports.createCodeMsg = function(msg)	{
	var code = randomString()
	if (codes.includes(code))	{
		delete(code)
		var code = randomString()
	}
  const sendPic = pics[Math.floor(Math.random() * pics.length)];
  msg1 = "**ELECTION INSTRUCTIONS**"
  msg2 = `Step 1: Copy this ${code}\nStep 2: Go to this link. <https://docs.google.com/forms/d/e/1FAIpQLSfG3-Hoa0cydMMPNS3i62k_WSDiVfmnLs5jnKDfNCjcJ5_eAA/viewform>\n\nStep 3: Follow the prompts in the form`
	messageSender(msg1, msg.author)
	messageSender(msg2, msg.author)
	messageSender(sendPic, msg.author)
}