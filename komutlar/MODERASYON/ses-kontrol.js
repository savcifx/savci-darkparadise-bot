const Discord = require("discord.js");

let qdb = require("quick.db");


exports.run = async (client, message, args) => {
  if (!message.guild) return
 let db = new qdb.table("sunucuayar")
let arr = await db.get(`rolayarlar.genel_rol_sorumlusu`) || []
if (!message.member.permissions.has(8) && !message.member.roles.cache.some(e => arr.some(x => x == e))) return message.reply("Bu komutu kullanabilmek için **Özel Rol Sorumlusu** ya da **Yönetici** yetkisine sahip olman gerekiyor!")

    let ekipRol = await db.get(`sunucuayar.booster_rol`)
    if (!ekipRol) return message.reply("Lütfen booster rolünü kurunuz!")
    let role= message.guild.roles.cache.get(ekipRol)
    let roller = []
    message.guild.roles.cache.forEach(x => {
    if (x.position > role.position) {
    roller.push(x.id)
    }
    })
  const sec = args[0]
  if (!sec) {
    let Kisukea = message.guild.members.cache.filter(member => {
      return member.roles.cache.some(r => roller.includes(r.id)) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot && client.ayarlar.yapimci.some(x => x !== member.user.id)
    }).map(member => ("<@" + member.user.id + ">")).join("\n");

    let Kisuke = message.guild.members.cache
      .filter(member => {
        return member.roles.cache.some(r => roller.includes(r.id)) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot && client.ayarlar.yapimci.some(x => x !== member.user.id)
      }).size;
    message.channel.send(`**Aktif olup seste olmayan ${client.emojiSayi(`${Kisuke}`)} adet yetkili saydım. Yetkililer;** \n${Kisukea || `Tüm yetkililer aktif görünüyor`}`);
  }


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yetkilisay", "yetkililer", "yetkililerisay", "ayt"],
  permLevel: 0
};
exports.help = {
  name: "yetkilisay",
  description: "t!yetkilisay yazdığın zaman discordda aktif olup seste olmayan yetkililerin ismini listeler.",
  usage: "yetkilisay",
  kategori: 'Sahip'
};
