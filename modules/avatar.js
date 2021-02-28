function avatar(msg) {
  let guild = client.guilds.cache.get('553718744233541656')
  if (msg.mentions.users.first() == undefined) {
    user = msg.author
  } else {
    user = msg.mentions.users.first()
  }
  if (guild.member(user)) {
    const avatarEmbed = new Discord.MessageEmbed()
    avatarEmbed.setColor(0x333333)
    avatarEmbed.setAuthor(user.tag)
    avatarEmbed.setImage(user.displayAvatarURL());
    msg.channel.send(avatarEmbed);
  } else {
    msg.channel.send(`<@${msg.author.id}>, that user isn't in this server!`)
  }
  delete(user)
  return
}