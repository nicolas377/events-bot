exports.getMemberNumber = function(msg) {
	return msg.guild.memberCount - 6 // the -6 removes the bots from the tally
}