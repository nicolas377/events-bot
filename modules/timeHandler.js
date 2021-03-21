function convertMiliseconds(miliseconds) {
	var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

	total_seconds = parseInt(Math.floor(miliseconds / 1000));
	total_minutes = parseInt(Math.floor(total_seconds / 60));
	total_hours = parseInt(Math.floor(total_minutes / 60));
	days = parseInt(Math.floor(total_hours / 24));

	seconds = parseInt(total_seconds % 60);
	minutes = parseInt(total_minutes % 60);
	hours = parseInt(total_hours % 24);


	return {
		d: days,
		h: hours,
		m: minutes,
		s: seconds
	};
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
		};
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