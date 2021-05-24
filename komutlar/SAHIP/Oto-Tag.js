const Discord = require('discord.js');
const qdb = require("quick.db");



exports.run = async (client, message, args) => {
  if (!message.guild) return
  let db = new qdb.table("sunucuayar");
  let db2 = new qdb.table("prefix");
  let guvenliKisiDB = new qdb.table("guvenlikisi");

  let gkv = await guvenliKisiDB.get(`guvenlikisi`) || []
  if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {
    let sunucutag = await db.get(`sunucuayar.sunucu_tag`) || ""
    const emoji = client.emojis.cache.find(x => x.name === "owsla_tik")
    const sec = args[0]
    const prefix = await db2.get("prefix.") || client.ayarlar.prefix
    if (!sec) {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter(client.ayarlar.footer)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`
  **Oto Tag Sistemi,**
  Sunucunuza Girenlere Oto Tag
  Vermek İçin: \`${prefix[0]}ototag kur ${sunucutag} | -uye-\`
  Kapatmak İçin \`${prefix[0]}ototag kapat\`
  `)
      message.channel.send({ embed: embed }).then(xyz => xyz.delete({timeout: 1500}))
    }
    if (sec == "kur") {
      let mesaj = args.slice(1).join(' ');
      if (await db.get(`sunucuayar.oto_tag`)) {
        return message.reply(`Bu sistem zaten aktif lütfen önce sıfırlayınız \`${prefix[0]}ototag kapat\``)
      }
      if (!args[1]) {
        return message.channel.send(`ototag Kullanımı Örnek \`${prefix[0]}ototagkur ${sunucutag} | -uye-\``)
      }
      await db.set(`sunucuayar.oto_tag`, mesaj)
      message.channel.send(`
  Oto Tag Sistemi Ayarlanmıştır. ${emoji}
  Unutmayın Sunucuya Yeni Katılan Kullanıcılar içindir. Kapatmak İçin \`${prefix[0]}ototagkapat\``)
    }
    if (sec == "kapat") {
      const tag = await db.get(`sunucuayar.oto_tag`)
      if (!tag) return message.reply(`Sanırım bu özellik zaten kapalıymış ${emoji}`)
      message.reply(`Bu özellik **başarıyla kapatıldı.** ${emoji}`)
      await db.delete(`sunucuayar.oto_tag`)
      await db.delete(`sunucuayar.isimtemizleyici`)
    }
   } else {
    return message.reply(
      "Bu komut sadece TAÇ sahibi tarafından kullanılabilir"
    );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ototag-sistemi"],
  permLevel: 0
};

exports.help = {
  name: 'ototag',
  description: 'Sunucuya giriş yapan üyelerin isminin başına tag koymaya yaramaktadır',
  usage: 'ototag',
  kategori: 'Sahip'
};
