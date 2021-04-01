exports.canvote = function(author) {
	rolelist = ["553723628957728820", "760665499330936922", "717878253305724932", "817502739306250280", "553723630643707905", "553723640789729301", "553723641465143356"]
	for (i = 0; i < rolelist.length; i++) {
		if (author.roles.cache.has(rolelist[i])) {
			return true
		}
	}
	return false
}