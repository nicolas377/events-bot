function pruneeventslist(events) {
	newlist = []
	for (i = 0; i < events.length; i++) {
		value = events[i]

		if (value[0] >= Date.now()) {
			newlist.push(value)
		}
	}

	newlist.sort(function(a, b) {
		return b[0] - a[0];
	});

	return newlist
}

function getDate(string) {
	const parts = string.split('-')
	const date = new Date(parts[0], parts[1] - 1, parts[2])

	return date.getTime()
}

exports.addevent = function(msg) {
	if (!(msg.member.roles.cache.has('717878253305724932') || msg.author.id == ('550456900861427733'))) {
		return msg.channel.send("You can't run that command!")
	}

	adding = []

	args = msg.content.substring(9).split(', ')

	date = getDate(args[0])

	if (isNaN(date)) {
		return msg.channel.send("The date isn't valid!")
	}

	events.push([date, args[1], args[2]])

	events = pruneeventslist(events)

	saveJSON()
}