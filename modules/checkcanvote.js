exports.canvote = function(author) {
	return false


	rolelist = ['553723641465143356', '553723640789729301', '553723630643707905', '830214074264059984']
	for (i = 0; i < rolelist.length; i++) {
		if (author.roles.cache.has(rolelist[i])) {
			return true
		}
	}
	return false
}