const Discord = require('discord.js')
const tc = require("timezonecomplete")

async function formatUserzoneObject(msg, userzone) {
  if (msg.guild.member(userzone.id)) { // if the user is in the guild; check by ID
    let Member = await msg.guild.members.fetch(userzone.id)
    // use user's nickname if user has a nickname, otherwise username
    let usrnick = Member.nickname ? Member.nickname : Member.user.username
    const utcTime = tc.nowUtc();
    const timeZone = tc.zone(userzone.ianaTz)
    // UTC offset in minutes
    let utcOffset = timeZone.offsetForUtc(utcTime)
    // convert to hours
    utcOffset = utcOffset/60
    // insert in object and return
    const userzoneFormatted = {nick: usrnick, offset: utcOffset}
    return userzoneFormatted
  } else {
    logger(`user ${userzone.id} has a timezone set in the JSON but is not in the guild`)
    return null
  }
}

async function formatTimezonesArray(msg) {
  /* set the line below to true if you want to sort by timezone
  set it to false if you want to sort by name  */
  timezonesSortByTimezone = false

  timezonesFormatted = []
  for (i of timezones) {
    userzoneFormatted = await formatUserzoneObject(msg, i)
    if (userzoneFormatted) {
      timezonesFormatted.push(userzoneFormatted)
    }
  }
  if (timezonesSortByTimezone) {
    timezonesFormatted.sort(function (a, b) {
      return a.offset - b.offset;
    })
  } else {
    timezonesFormatted.sort(function(a, b) {
      var nickA = a.nick.toUpperCase(); // ignore upper and lowercase
      var nickB = b.nick.toUpperCase(); // ignore upper and lowercase
      if (nickA < nickB) {
        return -1;
      }
      if (nickA > nickB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
  }
  return timezonesFormatted
}

function strFormatUser(userzoneFormatted) {
  let usrnick = userzoneFormatted.nick
  let utcOffset = userzoneFormatted.offset

  // neatly format it, adding a plus if offset is 0 or greater
  return `${usrnick}: UTC${(utcOffset >= 0) ? ("+" + utcOffset) : utcOffset}`
}

async function tzStrCreator(msg) {
  let tzStr = "**User timezones**\n"
  timezonesFormatted = await formatTimezonesArray(msg)
  for (i of timezonesFormatted) {
    tzStr += "\n"+strFormatUser(i)
  }
  return tzStr
}

exports.memberstzs = function(msg) {
  // time at which the offset will be calculated is now
  let strcreator = tzStrCreator(msg)
	strcreator.then((tzStr) => {return msg.channel.send(tzStr)})
}
