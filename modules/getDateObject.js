exports.getDateObject = function(existed) {
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