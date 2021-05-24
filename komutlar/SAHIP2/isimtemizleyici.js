const Discord = require('discord.js');
const qdb = require("quick.db");



exports.run = async (client, message, args) => {
  if (!message.guild) return
  let db = new qdb.table("sunucuayar");

  let db2 = new qdb.table("prefix");

  let guvenliKisiDB = new qdb.table("guvenlikisi");
  
  let gkv = guvenliKisiDB.get(`guvenlikisi`) || []
  if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {
    const sec = args[0]
    const emoji = client.emojis.cache.find(x => x.name === "owsla_tik")
    const prefix = await db2.get("prefix.") || client.ayarlar.prefix
    if (!sec) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter(client.ayarlar.footer)
        .setTimestamp()
        .addField(`İsim Temizleyici Nedir ?`,
          `*Sunucuya yeni giren üyelerin kullanıcı adlarındaki türkçe karakter olmayan harfleri temizlemektedir*
__Örneğin:__ \`ꄶ Kisuke\` *kullanıcı adı sunucuya girdiği zaman* \`Kisuke\` *olarak güncellenmektedir*
*Bu sistemi kullanabilmek için* \`${prefix[0]}otobotsilici aç/kapat\` *şeklinde çalıştırmalısınız*`)
      )
    }


    if (sec == "aç") {
      if (await db.get(`sunucuayar.isimtemizleyici`)) {
        return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Bu özellik zaten açık kapatmak istiyorsanız** \`${prefix[0]}isimtemizleyici kapat\` **yazabilirsiniz**`))
      }
      await db.set(`sunucuayar.isimtemizleyici`, "Aktif")
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Sistem başarıyla aktif edildi artık \`${message.guild.name}\` sunucusunda isimler temizlenecek**`))
    }
    if (sec == "kapat") {
      if (!await db.get(`sunucuayar.isimtemizleyici`)) {
        return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Bu özellik zaten kapalı açmak istiyorsanız** \`${prefix[0]}isimtemizleyici aç\` **yazabilirsiniz**`))
      }
      await db.delete(`sunucuayar.isimtemizleyici`)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Sistem başarıyla deaktif edildi artık \`${message.guild.name}\` sunucusunda isimler temizlenmeyecek**`))
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
  aliases: ["isim-temizleyici"],
  permLevel: 0
};

exports.help = {
  name: 'isimtemizleyici',
  description: 'Sunucuya giren üyelerin ismindeki semboller ve uygunsuz karakterleri temizler',
  usage: 'isimtemizleyici aç/kapat',
  kategori: 'Sahip 2'
};