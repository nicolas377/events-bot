function pruneeventslist(events) {
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

exports.runatmidnight = function() {
	// thanks to https://stackoverflow.com/a/38084691 for this function

	var now = new Date()
    var night = now
	night.setDate(new Date().getDate()+1)
	night.setHours(0, 0, 0)

    var msToMidnight = night.getTime() - now.getTime()

    setTimeout(function() {
        pruneeventslist(events)
        runatmidnight()
    }, msToMidnight)
}