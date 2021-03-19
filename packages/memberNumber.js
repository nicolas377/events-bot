exports.getMemberNumber = function(msg) {
	return msg.guild.memberCount - 7 // the -7 removes the bots from the tally
}