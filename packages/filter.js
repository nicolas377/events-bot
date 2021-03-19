exports.filter = function(msg) {

	if (msg.channel.id == '760831152109649940') {
		return false
	}

	words = msg.content.split(' ')

	for (var i = 0; i < words.length; i++) {
		word = words[i]
		word = word.replace(/([^a-zA-z0-9]+)/g, '').toLowerCase()
		words[i] = word
	}

	// check if any of the words are in the filter list

	for (var i = 0; i < words.length; i++) {
		if (removing.includes(words[i])) {
			return true
		}
	}

	return false

}