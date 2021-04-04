const Discord = require('discord.js')
const tc = require('timezonecomplete')

function jsonhandler(uid, timezone, remove = false) {
	if (remove) {
		if (timezones.hasOwnProperty(uid)) {
			delete timezones[uid]
			return true
		}
		return false
	}

	timezones[uid] = timezone
}

function getOffset(msg) {
	offset1 = parseFloat(msg.content.replace(/[^\d.-]/g, ''))
	offset2 = tc.hours(offset1)
	if (offset2.minute() == 0) {
		if (offset2 <= 0) {
			return `-${offset2.wholeHours()}:${offset2.minute()}0`
		}
		return `+${offset2.wholeHours()}:${offset2.minute()}0`
	}
	if (offset2 <= 0) {
		return `-${offset2.wholeHours()}:${offset2.minute()}`
	}
	return `+${offset2.wholeHours()}:${offset2.minute()}`

}

function addTimezone(msg) {
	if (msg.content.match(/^[A-Za-z]+$/)) {
		return msg.channel.send('You need to add an offset to that!')
	}
	var offset = getOffset(msg)
	console.log(tc.zone(offset))
	return msg.channel.send(offset)
}

function editTimezone(msg) {
	return
}

function deleteTimezone(msg) {
	if (jsonhandler(msg.author.id, null, true)) {
		return msg.channel.send(`${msg.author}, your timezone has been removed!`)
	}
	return msg.channel.send(`${msg.author}, you don't have a timezone in the database!`)
}

exports.timezone = async function(msg) {
	global.timezones = timezones
	if (msg.content.startsWith('$addtimezone')) {
		return addTimezone(msg)
	}
	if (msg.content.startsWith('$edittimezone')) {
		return editTimezone(msg)
	}
	if (msg.content.startsWith('$removetimezone')) {
		return deleteTimezone(msg)
	}
}