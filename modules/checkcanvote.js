exports.canvote = function(author) {
	rolelist = ["812715766046523433"]
	rolelist.forEach((item) => {
		if (author.roles.cache.has(item)) {
			return true
		}
	})
	return false
}