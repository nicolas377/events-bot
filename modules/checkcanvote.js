exports.canvote = function(author) {
	rolelist = []
	for (i = 0; i < rolelist.length; i++) {
		if (author.roles.cache.has(rolelist[i])) {
			return true
		}
	}
	return false
}