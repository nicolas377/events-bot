const Discord = require('discord.js')

function convertMiliseconds(miliseconds) {
	var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds

	total_seconds = parseInt(Math.floor(miliseconds / 1000))
	total_minutes = parseInt(Math.floor(total_seconds / 60))
	total_hours = parseInt(Math.floor(total_minutes / 60))
	days = parseInt(Math.floor(total_hours / 24))

	seconds = parseInt(total_seconds % 60)
	minutes = parseInt(total_minutes % 60)
	hours = parseInt(total_hours % 24)


	return {
		d: days,
		h: hours,
		m: minutes,
		s: seconds
	}
}

function getDateObject(existed) {
	data = convertMiliseconds(existed)
	const calculateTimimg = d => {
		let months = 0,
			years = 0,
			days = 0,
			weeks = 0
		while (d) {
			if (d >= 365) {
				years++
				d -= 365
			} else if (d >= 30) {
				months++
				d -= 30
			} else if (d >= 7) {
				weeks++
				d -= 7
			} else {
				days++
				d--
			}
		}
		return {
			years,
			months,
			weeks,
			days
		}
	}

	moredata = calculateTimimg(data.d)

	return {
		y: moredata.years,
		m: moredata.months,
		w: moredata.weeks,
		d: moredata.days,
		h: data.h,
		mi: data.m,
		s: data.s
	}
}

function timeHandler(existed) {
	dateobj = getDateObject(existed)

	if (dateobj.y > 0) {
		return `Years: ${dateobj.y}, Months: ${dateobj.m}, Weeks: ${dateobj.w}, Days: ${dateobj.d}`
	}
	if (dateobj.m > 0) {
		return `Months: ${dateobj.m}, Weeks: ${dateobj.w}, Days: ${dateobj.d}`
	}
	if (dateobj.w > 0) {
		return `Weeks: ${dateobj.w}, Days: ${dateobj.d}, Hours: ${dateobj.h}`
	}
	if (dateobj.d > 0) {
		return `Days: ${dateobj.d}, Hours: ${dateobj.h}, Minutes: ${dateobj.mi}`
	}
	if (dateobj.h > 0) {
		return `Hours: ${dateobj.h}, Minutes: ${dateobj.mi}, Seconds: ${dateobj.s}`
	}
	return `Minutes: ${dateobj.mi}, Seconds: ${dateobj.s}`
}

function rolegetter(user, msg) {
	// gets a string that mentions every role a user has

	str = ''
	roles = user.roles.member._roles
	roles.forEach(function(item) {
		role = msg.guild.roles.cache.get(item)
		str += `<@&${role.id}> `
	})
	return str
}

function dateStr(date) {
	date = new Date(date)
	var year = date.getFullYear()
	var month = ("0" + (date.getMonth() + 1)).slice(-2)
	var day = ("0" + date.getDate()).slice(-2)
    
	return `${year}-${month}-${day}`
}

exports.userinfo = (msg) => {
	// i want role mentions that dont ping (gotten, needs implement in embed), user age, and avatar

	roles = rolegetter(msg.member, msg)

	joinedAtDatestr = dateStr(msg.author.joinedAt)

	embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setAuthor(msg.author.tag)
		.setTimestamp()
		.addFields(
			{
				name: 'msg.author ID',
				value: `${msg.author.id}`
			},
			{
				name: `Joined Discord`,
				value: `${dateStr(msg.author.createdAt)} (${timeHandler(Date.now() - msg.author.createdAt)})`
			},
			{
				name: `Joined Server`,
				value: `${dateStr(msg.author.joinedAt)} (${timeHandler(Date.now() - msg.author.joinedAt)})`
			}
		)
	return embed
}