const Discord = require('discord.js');
const qdb = require("quick.db");



exports.run = async (client, message, args) => {
  if (!message.guild) return
  let db = new qdb.table("sunucuayar");
  let db2 = new qdb.table("prefix");
  let guvenliKisiDB = new qdb.table("guvenlikisi");
  
  let gkv = await guvenliKisiDB.get(`guvenlikisi`) || []
  if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {
    const sec = args[0]
    const emoji = client.emojis.cache.find(x => x.name === "owsla_tik")
    const prefix = db2.get("prefix.") || client.ayarlar.prefix
    if (!sec) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter(client.ayarlar.footer)
        .setTimestamp()
        .addField(`Oto Kayıt Nedir ?`,
          `*Sunucuya daha önceden kayıt olan arkadaşları gir çık yaptığı zaman tekrardan eski isimleri ve rolleriyle kayıt etmektedir!*
*Bu sistemi kullanabilmek için* \`${prefix[0]}otokayıt aç/kapat\` *şeklinde çalıştırmalısınız*`)
      )
    }


    if (sec == "aç") {
      if (await db.get(`sunucuayar.otokayit`)) {
        return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Bu özellik zaten açık kapatmak istiyorsanız** \`${prefix[0]}otokayıt kapat\` **yazabilirsiniz**`))
      }
      await db.set(`sunucuayar.otokayit`, "Aktif")
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Sistem başarıyla aktif edildi**`))
    }
    if (sec == "kapat") {
      if (!await db.get(`sunucuayar.otokayit`)) {
        return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Bu özellik zaten kapalı açmak istiyorsanız** \`${prefix[0]}otokayıt aç\` **yazabilirsiniz**`))
      }
      await db.delete(`sunucuayar.otokayit`)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Sistem başarıyla deaktif edildi!**`))
    }
  } else {
    return message.reply(
      "Bu komut sadece TAÇ sahibi tarafından kullanılabilir"
    );
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["otokayit"],
  permLevel: 0
};

exports.help = {
  name: 'otokayıt',
  description: 'Sunucuda sohbet kanalına yazılan küfür/argo/hakaret gibi kelimeleri engeller',
  usage: 'küfür aç/kapat',
  kategori: 'Sahip 2'
};