const convertMilliseconds = require('./convertMiliseconds')
const getDateObject = require('./getDateObject')

exports.timeHandler = function(existed) {
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