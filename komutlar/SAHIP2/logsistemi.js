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
    let logk = message.mentions.channels.first();
    const prefix = await db2.get("prefix.") || client.ayarlar.prefix
    if (!sec) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter(client.ayarlar.footer)
        .setTimestamp()
        .setImage("https://cdn.discordapp.com/attachments/659845938407407626/708919811874226176/mMxFLcF.gif")
        .addField(`Log Sistemi Nedir ?`,
          `*Botumuz en ufak mesaj editinden tutun, kullanıcı adı değişimine kadar tüm logları kapsamaktadır*
*Bu sistemi kullanabilmek için* \`${prefix[0]}logsistemi tanımla #kanal\` *şeklinde çalıştırmalısınız*`)
      )
    }
    if (sec && sec == "tanımla") {
      if (await db.get(`sunucuayar.log_sistemi`)) {
        return message.reply(`Log kanalı zaten sunucunuzda tanımlanmış`).then(sil => sil.delete({
          timeout: 5000
        }))
      }
      if (!client.guilds.cache.get(message.guild.id).channels.cache.get(logk.id)) {
        return message.reply("Bulunduğunuz sunucudaki bir kanalı etiketleyiniz")
      } else {
        await db.set(`sunucuayar.log_sistemi_kanal`, logk.id)
        await db.set(`sunucuayar.log_sistemi`, "Aktif")
        return message.reply(`Başarılı bir şekilde ${logk} kanalını tanımladınız`).then(sil => sil.delete({
          timeout: 5000
        }))
      }

    }

    if (sec == "sıfırla" || sec == "kapat" || sec == "sil") {
      if (!await db.get(`sunucuayar.log_sistemi`)) {
        return message.reply(`Log kanalı zaten sıfırlanmış lütfen tekrardan tanımlayınız`).then(sil => sil.delete({
          timeout: 5000
        }))
      }
      await db.delete(`sunucuayar.log_sistemi_kanal`)
      await db.delete(`sunucuayar.log_sistemi`)
      return message.reply(`Başarılı bir şekilde log sistemini sıfırladınız`).then(sil => sil.delete({
        timeout: 5000
      }))
    }
  } else {
    return message.reply(
      "Bu komutu kullanabilmek için gerekli izne sahip değilsin"
    );
  }
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["log-sistem", "log-sistemi"],
  permLevel: 0
};

exports.help = {
  name: 'logsistemi',
  description: 'Sunucudaki tüm sistemlerin loglanmasını açıp veya kapatmaya yaramaktadır',
  usage: 'logsistemi tanımla #kanal/sıfırla',
  kategori: 'Sahip 2'
};