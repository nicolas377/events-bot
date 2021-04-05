const Discord = require('discord.js')
const tc = require('timezonecomplete')

function jsonhandler(uid, timezone, remove = false) {
	if (remove) {
		if (timezones.hasOwnProperty(uid)) {
			delete timezones[uid]
			saveJSON()
			return true
		}
		return false
	}

	timezones[uid] = timezone
	saveJSON()
	return true
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

function getUsername(id) {
	guild = client.guilds.cache.get("553718744233541656")
	member = guild.members.cache.get(id)
	return member.displayName
}

async function updateMessage(timezones) {
	messageinchannel = await client.channels.cache.get('828626472512126986').messages.fetch("828626939803074620")
	tosend = ""
	for (const property in timezones) {
		var uid = property
		var offset = timezones[property]
		if (tosend == "") {
			tosend += `**${getUsername(uid)}**: ${offset}`
		} else {
			tosend += `\n**${getUsername(uid)}**: ${offset}`
		}
	}
	messageinchannel.edit(tosend)
}

function addTimezone(msg, client, timezones) {
	if (msg.content.match(/^[A-Za-z]+$/)) {
		return msg.channel.send('You need to add an offset to that!')
	}
	var offset = getOffset(msg)
	if (jsonhandler(msg.author.id, offset)) {
		updateMessage(timezones, client)
		return msg.channel.send("Your offset has been added!\n**NOTE:** This system does not account for Daylight Savings Time changes. Run this command again to update your timezone.")
	}
	return msg.channel.send("Seems like something went wrong. Try again in a few minutes.")
}

function deleteTimezone(msg) {
	if (jsonhandler(msg.author.id, null, true)) {
		return msg.channel.send(`${msg.author}, your timezone has been removed!`)
	}
	return msg.channel.send(`${msg.author}, you don't have a timezone in the database!`)
}

exports.timezone = async function(msg) {
	global.timezones = timezones
	global.client = client
	if (msg.content.startsWith('addtimezone')) {
		return addTimezone(msg, client, timezones)
	}
	if (msg.content.startsWith('removetimezone')) {
		return deleteTimezone(msg)
	}
	if (msg.content.startsWith('updatemessage')) {
		return updateMessage(timezones, client)
	}
}