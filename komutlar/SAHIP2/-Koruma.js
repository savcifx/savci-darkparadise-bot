const Discord = require('discord.js');
const qdb = require("quick.db");



module.exports.run = async function (client, message, args) {
  if (!message.guild) return
  let db = new qdb.table("sunucuayar");
  let db3 = new qdb.table("prefix");
  let guvenliKisiDB = new qdb.table("guvenlikisi");

  let gkv = await guvenliKisiDB.get(`guvenlikisi`) || []

  if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {
    const sec = args[0]
    let logk = message.mentions.channels.first();
    const prefix = await db3.get("prefix.") || client.ayarlar.prefix
    if (sec == "yardım") {

      return message.channel.send(new Discord.MessageEmbed().setColor(`RANDOM`)
        .setImage("https://cdn.discordapp.com/attachments/659845938407407626/708919447657906176/4e7bbF3.gif")
        .setDescription(`**Koruma Sistemi Nedir ?**
*Son zamanlarda* \`SUNUCU PATLATMA\` *adı altında insanların prim kasmasını*
*Önlemek amacıyla bu sistemi ücretsiz bir şekilde hizmetinize sunma kararı aldık*
*Bu sistemdeki asıl amaç sunucunuza güvenmediğiniz kişilere* \`YÖNETİCİ\` *yetkisi*
*verseniz bile o kişi siz müsade etmedikce sunucuya zarar veremiyor.*

**Koruma Nasıl Aktif Ederim ?**
*Korumayı Aktif edebilmek için yapmanız gereken tek şey*
*Bot'u Tüm rollerden* **en üst seviyeye** *getirmek ve* **bot üstü** *yetki olayının olmamasıdır!*
*Bu işlemi gerçekleştirdikten sonra* \`${prefix[0]}koruma hepsini #logkanalı\` *şeklinde giriniz*`)
        .addField(`Anti Raid Koruma`, `\`${prefix[0]}koruma antiraid #kanal\`\n\`${prefix[0]}koruma antiraid-sil\``)
        .addField(`Sunucu Koruma`, `\`${prefix[0]}koruma sunucu #kanal\`\n\`${prefix[0]}koruma sunucu-sil\``)
        .addField(`Kanal Koruma`, `\`${prefix[0]}koruma sunucu #kanal\`\n\`${prefix[0]}koruma kanal-sil\``)
        .addField(`Rol Koruma`, `\`${prefix[0]}koruma rol #kanal\`\n\`${prefix[0]}koruma rol-sil\``)
        .addField(`Sağ Tık Koruma`, `\`${prefix[0]}koruma sagtik #kanal\`\n\`${prefix[0]}koruma sagtik-sil\``)
        .addField(`Korumaların Hepsi`, `\`${prefix[0]}koruma hepsini #kanal\`\n\`${prefix[0]}koruma hepsini sıfırla\``)
      )




    }
    if (!sec) {

      return message.channel.send(new Discord.MessageEmbed().setColor(`RANDOM`)
        .setImage("https://cdn.discordapp.com/attachments/659845938407407626/708919447657906176/4e7bbF3.gif")
        .setDescription(`**Koruma Sistemi Nedir ?**
*Son zamanlarda* \`SUNUCU PATLATMA\` *adı altında insanların prim kasmasını*
*Önlemek amacıyla bu sistemi ücretsiz bir şekilde hizmetinize sunma kararı aldık*
*Bu sistemdeki asıl amaç sunucunuza güvenmediğiniz kişilere* \`YÖNETİCİ\` *yetkisi*
*verseniz bile o kişi siz müsade etmedikce sunucuya zarar veremiyor.*

**Koruma Nasıl Aktif Ederim ?**
*Korumayı Aktif edebilmek için yapmanız gereken tek şey*
*Bot'u Tüm rollerden* **en üst seviyeye** *getirmek ve* **bot üstü** *yetki olayının olmamasıdır!*
*Bu işlemi gerçekleştirdikten sonra* \`${prefix[0]}koruma hepsini #logkanalı\` *şeklinde giriniz*`)
        .addField(`Anti Raid Koruma`, `\`${prefix[0]}koruma antiraid #kanal\`\n\`${prefix[0]}koruma antiraid-sil\``)
        .addField(`Sunucu Koruma`, `\`${prefix[0]}koruma sunucu #kanal\`\n\`${prefix[0]}koruma sunucu-sil\``)
        .addField(`Kanal Koruma`, `\`${prefix[0]}koruma sunucu #kanal\`\n\`${prefix[0]}koruma kanal-sil\``)
        .addField(`Rol Koruma`, `\`${prefix[0]}koruma rol #kanal\`\n\`${prefix[0]}koruma rol-sil\``)
        .addField(`Sağ Tık Koruma`, `\`${prefix[0]}koruma sagtik #kanal\`\n\`${prefix[0]}koruma sagtik-sil\``)
        .addField(`Korumaların Hepsi`, `\`${prefix[0]}koruma hepsini #kanal\`\n\`${prefix[0]}koruma hepsini sıfırla\``))

    }



    if (sec && sec === "antiraid") {
      if (await db.get(`sunucuayar.bot_koruma`)) {
        return message.reply(`AntiRaid zaten aktif görünüyor`).then(sil => sil.delete({
          timeout: 5000
        }))
      }
      await db.set(`sunucuayar.bot_koruma_kanal`, logk.id)
      await db.set(`sunucuayar.bot_koruma`, args[1])
      return message.reply(`Başarılı bir şekilde ${logk} kanalını tanımladınız`).then(sil => sil.delete({
        timeout: 5000
      }))
    }

    if (sec === "antiraid-sil" || sec === "antiraid-kapat" || sec === "antiraid-sıfırla") {
      if (!await db.get(`sunucuayar.bot_koruma`)) {
        return message.reply(`AntiRaid zatan kapalı lütfen aktif ediniz`).then(sil => sil.delete({
          timeout: 5000
        }))
      }
      await db.delete(`sunucuayar.bot_koruma_kanal`)
      await db.delete(`sunucuayar.bot_koruma`)
      return message.reply(`Başarılı bir şekilde AntiRaid sistemini kapattınız`).then(sil => sil.delete({
        timeout: 5000
      }))
    }
    // ############################################################################################################################################################################################
    if (sec && sec === "sunucu") {
      if (await db.get(`sunucuayar.sunucu_koruma`)) {
        return message.reply(`Sunucu Koruma zaten aktif görünüyor`).then(sil => sil.delete({
          timeout: 5000
        }))
      }
      await db.set(`sunucuayar.sunucu_koruma_kanal`, logk.id)
      await db.set(`sunucuayar.sunucu_koruma`, args[1])
      return message.reply(`Başarılı bir şekilde ${logk} kanalını tanımladınız`).then(sil => sil.delete({
        timeout: 5000
      }))
    }

    if (sec === "sunucu-sil" || sec === "sunucu-kapat" || sec === "sunucu-sıfırla") {
      if (!await db.get(`sunucuayar.sunucu_koruma`)) {
        return message.reply(`Sunucu Koruma zatan kapalı lütfen aktif ediniz`).then(sil => sil.delete({
          timeout: 5000
        }))
      }
      await db.delete(`sunucuayar.sunucu_koruma_kanal`)
      await db.delete(`sunucuayar.sunucu_koruma`)
      return message.reply(`Başarılı bir şekilde Sunucu Koruma sistemini kapattınız`).then(sil => sil.delete({
        timeout: 5000
      }))
    }
    // ############################################################################################################################################################################################
    if (sec && sec === "kanal") {
      if (await db.get(`sunucuayar.kanal_koruma`)) {
        return message.reply(`Kanal Koruma zaten aktif görünüyor`).then(sil => sil.delete({
          timeout: 5000
        }))
      }
      await db.set(`sunucuayar.kanal_koruma_kanal`, logk.id)
      await db.set(`sunucuayar.kanal_koruma`, args[1])
      return message.reply(`Başarılı bir şekilde ${logk} kanalını tanımladınız`).then(sil => sil.delete({
        timeout: 5000
      }))
    }

    if (sec === "kanal-sil" || sec === "kanal-kapat" || sec === "kanal-sıfırla") {
      if (!await db.get(`sunucuayar.kanal_koruma`)) {
        return message.reply(`Kanal Koruma zatan kapalı lütfen aktif ediniz`).then(sil => sil.delete({
          timeout: 5000
        }))
      }

      await db.delete(`sunucuayar.kanal_koruma_kanal`)
      await db.delete(`sunucuayar.kanal_koruma`)
      return message.reply(`Başarılı bir şekilde Kanal Koruma sistemini kapattınız`).then(sil => sil.delete({
        timeout: 5000
      }))
    }
    // ############################################################################################################################################################################################

    // ############################################################################################################################################################################################
    if (sec && sec === "rol") {
      if (await db.get(`sunucuayar.rol_koruma`)) {
        return message.reply(`Rol Koruma zaten aktif görünüyor`).then(sil => sil.delete({
          timeout: 5000
        }))
      }
      await db.set(`sunucuayar.rol_koruma_kanal`, logk.id)
      await db.set(`sunucuayar.rol_koruma`, args[1])
      return message.reply(`Başarılı bir şekilde ${logk} kanalını tanımladınız`).then(sil => sil.delete({
        timeout: 5000
      }))
    }

    if (sec === "rol-sil" || sec === "rol-kapat" || sec === "rol-sıfırla") {
      if (!await db.get(`sunucuayar.rol_koruma`)) {
        return message.reply(`Rol Koruma zatan kapalı lütfen aktif ediniz`).then(sil => sil.delete({
          timeout: 5000
        }))
      }
      await db.delete(`sunucuayar.rol_koruma_kanal`)
      await db.delete(`sunucuayar.rol_koruma`)
      return message.reply(`Başarılı bir şekilde Rol Koruma sistemini kapattınız`).then(sil => sil.delete({
        timeout: 5000
      }))
    }
    // ############################################################################################################################################################################################
    if (sec && sec === "sagtik") {
      if (await db.get(`sunucuayar.sag_tik_koruma`)) {
        return message.reply(`Sağ Tık Koruma zaten aktif görünüyor`).then(sil => sil.delete({
          timeout: 5000
        }))
      }
      await db.set(`sunucuayar.sag_tik_koruma_kanal`, logk.id)
      await db.set(`sunucuayar.sag_tik_koruma`, args[1])
      return message.reply(`Başarılı bir şekilde ${logk} kanalını tanımladınız`).then(sil => sil.delete({
        timeout: 5000
      }))
    }

    if (sec === "sagtik-sil" || sec === "sagtik-kapat" || sec === "sagtik-sıfırla") {
      await db.delete(`sunucuayar.sag_tik_koruma_kanal`)
      await db.delete(`sunucuayar.sag_tik_koruma`)
      return message.reply(`Başarılı bir şekilde Sağ Tık Koruma sistemini kapattınız`).then(sil => sil.delete({
        timeout: 5000
      }))
    }



    if (sec == "hepsini") {
      const kanal = await db.get(`sunucuayar`)
      const kanal2 = message.mentions.channels.first()

      if (args[1] === "sıfırla" || args[1] === "kapat" || args[1] === "durdur") {
        if (kanal2) return message.channel.send(`:x: Ayarlanmayan şeyi sıfırlayamazsın.`)
        await db.delete(`sunucuayar.bot_koruma`)
        await db.delete(`sunucuayar.sunucu_koruma`)
        await db.delete(`sunucuayar.kanal_koruma`)
        await db.delete(`sunucuayar.rol_koruma`)
        await db.delete(`sunucuayar.sag_tik_koruma`)
        await db.delete(`sunucuayar.bot_koruma_kanal`)
        await db.delete(`sunucuayar.sunucu_koruma_kanal`)
        await db.delete(`sunucuayar.kanal_koruma_kanal`)
        await db.delete(`sunucuayar.rol_koruma_kanal`)
        await db.delete(`sunucuayar.sag_tik_koruma_kanal`)
        message.channel.send(`Tüm Korumalar sıfırlandı ✅`)
        return
      }


      if (!args[1] || !kanal2 || args[1] <= message.guild.memberCount) return message.channel.send(`:x: Gerekli yerleri düzgün doldurmalısın! =>  \`${prefix[0]}koruma hepsini #kanal\``)


      if (!client.guilds.cache.get(message.guild.id).channels.cache.get(kanal2.id)) {
        return message.channel.send(`Lütfen sunucu içerisinde bulunan bir kanalı etiketleyiniz!`)
      }
      await db.set(`sunucuayar.bot_koruma`, args[1])
      await db.set(`sunucuayar.sunucu_koruma`, args[1])
      await db.set(`sunucuayar.kanal_koruma`, args[1])
      await db.set(`sunucuayar.rol_koruma`, args[1])
      await db.set(`sunucuayar.sag_tik_koruma`, args[1])
      await db.set(`sunucuayar.bot_koruma_kanal`, kanal2.id)
      await db.set(`sunucuayar.sunucu_koruma_kanal`, kanal2.id)
      await db.set(`sunucuayar.kanal_koruma_kanal`, kanal2.id)
      await db.set(`sunucuayar.rol_koruma_kanal`, kanal2.id)
      await db.set(`sunucuayar.sag_tik_koruma_kanal`, kanal2.id)
      message.channel.send(`Sunucu koruma sistemi tamamlandı. ✅`)
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
  aliases: ['koruma'],
  permLevel: 0
};

exports.help = {
  name: 'korumakurulum',
  description: 'Sunucu koruma sistemini kontrol edebilirsiniz!',
  usage: 'koruma',
  kategori: 'Sahip 2'
};