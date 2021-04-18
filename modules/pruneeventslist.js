exports.pruneeventslist = function() {
	newlist = []
	for (i = 0; i < events.length; i++) {
		value = events[i]

		if ((value[0] + 86400000) >= Date.now()) {
			newlist.push(value)
		}
	}

	newlist.sort(function(a, b) {
		return b[0] - a[0];
	});

	return newlist
}