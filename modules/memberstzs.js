const Discord = require('discord.js')
const tc = require("timezonecomplete")

function strFormatUser(userzone, Member, members) {
  // use user's nickname if user has a nickname, otherwise username
  usrnick = Member.nickname ? Member.nickname : Member.user.username
  const utcTime = tc.nowUtc();
  const timeZone = tc.zone(userzone.ianaTz)
  // UTC offset in minutes
  let utcOffset = timeZone.offsetForUtc(utcTime)
  // convert to hours
  utcOffset = utcOffset/60
  // and neatly format it
  return `${usrnick}: ${utcOffset}`
}

async function strAppendUser(msg, tzStr, userzone) {
  if (msg.guild.member(userzone.id)) { // if the user is in the guild; check by ID
    let Member = await msg.guild.members.fetch(userzone.id)
    const formattedOffset = strFormatUser(userzone, Member, msg.guild.members)
    tzStr += `\n${formattedOffset}`
  } else {
    logger(`user ${userzone.id} has a timezone set in the JSON but is not in the guild`)
  }
  return tzStr
}

async function tzStrCreator(msg) {
  let tzStr = "**User timezones**\n"
  for (i of timezones) {
    tzStr = await strAppendUser(msg, tzStr, i)
  }
  return tzStr
}

exports.memberstzs = function(msg) {
  // time at which the offset will be calculated is now
  let strcreator = tzStrCreator(msg)
	strcreator.then((tzStr) => {return msg.channel.send(tzStr)})
}
