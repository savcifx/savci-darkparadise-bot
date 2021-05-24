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
    const prefix = await db2.get("prefix.") || client.ayarlar.prefix
    if (!sec) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter(client.ayarlar.footer)
        .setTimestamp()
        .addField(`Küfür Koruma Nedir ?`,
          `*Sunucuda sohbet kanalında üyelerin küfür edip etmediğini kontrol etmeye yarayan bir sistemdir*
*Bu sistemi kullanabilmek için* \`${prefix[0]}küfür aç/kapat\` *şeklinde çalıştırmalısınız*`)
      )
    }


    if (sec == "aç") {
      if (await db.get(`sunucuayar.kufur_koruma`)) {
        return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Bu özellik zaten açık kapatmak istiyorsanız** \`${prefix[0]}küfür kapat\` **yazabilirsiniz**`))
      }
      await db.set(`sunucuayar.kufur_koruma`, "Aktif")
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Sistem başarıyla aktif edildi artık \`${message.guild.name}\` sunucusunda küfür edilemez**`))
    }
    if (sec == "kapat") {
      if (!await db.get(`sunucuayar.kufur_koruma`)) {
        return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Bu özellik zaten kapalı açmak istiyorsanız** \`${prefix[0]}küfür aç\` **yazabilirsiniz**`))
      }
      await db.delete(`sunucuayar.kufur_koruma`)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum-2,**
${emoji} **Sistem başarıyla deaktif edildi artık \`${message.guild.name}\` sunucusunda küfür edilebilir**`))
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
  aliases: ["kufur"],
  permLevel: 0
};

exports.help = {
  name: 'küfür',
  description: 'Sunucuda sohbet kanalına yazılan küfür/argo/hakaret gibi kelimeleri engeller',
  usage: 'küfür aç/kapat',
  kategori: 'Sahip 2'
};