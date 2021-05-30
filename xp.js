// ## XP_SYSTEM CUSTOM MADE BY DARKBOY
// ## SPEED_CODING ANY ERRORS PLZ DM ME THOURGH DISCORD.
const Discord = require('discord.js')
const darky = new Discord.Client()
const xp = require('quick.db')
const Canvacord = require('canvacord')
const prefix = '!'
darky.on('ready', () => {
console.log('Bot Username: ' + darky.user.tag)
console.log('Prefix: !')})


darky.on('message', async xpcore => {
 if(xpcore.author.bot) return
 usersxp(xpcore) 
 if (xpcore.content.startsWith(prefix + 'rank')){
  var userm = xpcore.mentions.users.first() || xpcore.author
    var level = xp.get(`xpguild_${xpcore.guild.id}_xplevel_${userm.id}`) || 0
    level = level.toString()
    let usermxp = xp.get(`xpguild_${xpcore.guild.id}_${userm.id}`) || 0
    var missingxp = level * 1000 + 1000 
    let everyxp = xp.all().filter(i => i.ID.startsWith(`xpguild_${xpcore.guild.id}_total_${userm.id}`)).sort((a, b) => b.data - a.data)

  var rank = everyxp.map(x => x.ID).indexOf(`xpguild_${xpcore.guild.id}_total_${userm.id}`) + 1
  rank = rank.toString()
  var rankcard = await Canvacord.rank({
    username: userm.username,
    discrim: userm.discriminator,
    status: userm.presence.status,
    currentXP: usermxp.toString(),
    neededXP: missingxp.toString(),
    rank,
    level,
    avatarURL: userm.displayAvatarURL({ format: "png" }),
    color: "white"
  })
  return xpcore.channel.send(new Discord.MessageAttachment(rankcard, "rankcard.png"))
 }
})
function usersxp(xpcore) {
  if(xpcore.content.startsWith(prefix)) return
  let xprandom = Math.floor(Math.random() * 5) + 100
  console.log(xprandom)
  
  xp.add(`xpguild_${xpcore.guild.id}_${xpcore.author.id}`, xprandom)
  xp.add(`xpguild_${xpcore.guild.id}_total_${xpcore.author.id}`, xprandom)

  var xplevel = xp.get(`xpguild_${xpcore.guild.id}_xplevel_${xpcore.author.id}`) || 1
  var userxp = xp.get(`xpguild_${xpcore.guild.id}_${xpcore.author.id}`)
  
  var missingxp = xplevel * 1000
  if (missingxp < userxp) {
  var NLevel = xp.add(`xpguild_${xpcore.guild.id}_xplevel_${xpcore.author.id}`, 1)
  var nextlevel = NLevel + 1
  xp.subtract(`xpguild_${xpcore.guild.id}_${xpcore.author.id}`, userxp)
  const xpleveledup = new Discord.MessageEmbed()
  .setAuthor(`  Leveled Up!  `)
  .setDescription(`
  :arrow_forward: **You Are Level ${NLevel}** 
  **Next Level**: ${nextlevel}
  `)
   .setThumbnail(`https://cdn.discordapp.com/emojis/737080765451337779.gif?v=1`)
   .setImage('https://media.discordapp.net/attachments/735309947398783026/750336638151950396/wdCvsII74o74wAAAABJRU5ErkJggg.png')
   xpcore.channel.send(`<@${xpcore.author.id}>`)
   xpcore.channel.send(xpleveledup)
  }

}
darky.on('message', async xpcore => {
  if(xpcore.author.bot) return
  if (xpcore.content.startsWith(prefix + 'top')){
  let xptop = xp.all(`xpguild_${xpcore.guild.id}_${xpcore.author.id}`, { sort: '.data'})
  let content = ``;
  for (let i = 0; i < xptop.length; i++) {
    let user = darky.users.cache.get(xptop[i].ID.split('_')[2])

  content += `${i+1}. ${user} ${xptop[i].data} XP\n`

  }
  const xptop2 = new Discord.MessageEmbed()
  .setAuthor(`${xpcore.guild.name} XP TOP`)
  .setDescription(content)
  xpcore.channel.send(xptop2)
}});
darky.login('token')
