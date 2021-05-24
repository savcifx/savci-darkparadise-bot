const Discord = require('discord.js');
const qdb = require("quick.db");


exports.run = async (client, message, args) => {
  if (!message.guild) return
  let db = new qdb.table("sunucuayar");
  let db2 = new qdb.table("prefix");
  let guvenliKisiDB = new qdb.table("guvenlikisi");
  let rolAyarlarDB = new qdb.table("rolayarlar");


  let gkv = await guvenliKisiDB.get(`guvenlikisi`) || []

  if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {
    const sec = args[0]
    let emoji = message.guild.emojis.cache.find(x => x.name === "owsla_acik")
    let emoji2 = message.guild.emojis.cache.find(x => x.name === "owsla_kapali");
    let emoji3 = message.guild.emojis.cache.find(x => x.name === "owsla_tik")
    let prefix = db2.get("prefix.") || client.ayarlar.prefix


    if (sec == "yardım") {
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM')
        .addField(`Sunucu Kurulum Nedir ?`, `Sunucu \`ID adresiniz TAG'ınız LINK'iniz ve FOTO'nuz\` tanımlandıktan sonra
**!tag, !link, Tag, !say, !ayt** komutlarında bu olayları göreceksiniz.
`)
        .addField(`─────────────────────`, `
**Sunucu Kurulumlarını Tanımlamak İçin**
\`\`\`${prefix[0]}kurulum id <ID>
${prefix[0]}kurulum tag <tag>
${prefix[0]}kurulum link <link>
${prefix[0]}kurulum foto <foto>\`\`\`
`)
        .addField(`Kanal Kurulum Nedir ?`, `Kanallar tanımlandıktan sonra güncellemeler de gelecek olan özelliklerden
yararlanabileceksiniz bu özelliklerden aktif olan sohbet kanalının açıklama kısmıdır`)
        .addField(`─────────────────────`, `
**Kurulum kanallarını tanımlamak için**
\`\`\`${prefix[0]}kurulum kayit-kanal #kanal
${prefix[0]}kurulum jail-kanal #kanal
${prefix[0]}kurulum taglog-kanal #kanal
${prefix[0]}kurulum sohbet-kanal #kanal
${prefix[0]}kurulum kurallar-kanal #kanal
${prefix[0]}kurulum sleep-kanal #kanal
${prefix[0]}kurulum cezapuan-kanal #kanal
\`\`\`
`)
        .addField(`Rol Kurulum Nedir ?`, `
Botumuz \`SUNUCU BOTU\` özelliği barındırdığı için gerekli olan tüm rollerin kurulumunu yapmak zorundasınız
Bu rolleri kurduktan sonra botunuz artık size özel bir \`SUNUCU BOTU\` olacaktır`)
        .addField(`─────────────────────`, `
**Genel kurulum rollerini tanımlamak için**
\`\`\`${prefix[0]}kurulum vkyonetici @rol
${prefix[0]}kurulum erkek @rol @rol2
${prefix[0]}kurulum kız @rol @rol2
${prefix[0]}kurulum ekip-rol @rol
${prefix[0]}kurulum booster-rol @rol
${prefix[0]}kurulum muted @rol
${prefix[0]}kurulum voicemuted @rol
${prefix[0]}kurulum jail @rol
${prefix[0]}kurulum yasaklıtag @rol
${prefix[0]}kurulum kayıt-sorumlusu
${prefix[0]}kurulum ozel-rol-sorumlusu
\`\`\`
`)
        .addField(`─────────────────────`, `
**Diğer Kurulum Komutları**

\`${prefix[0]}özelkomut\`, \`${prefix[0]}ikilitagsistemi\`, \`${prefix[0]}yasaklıtag\`, \`${prefix[0]}güvenlikişi\`, \`${prefix[0]}isim-yaş-sistemi\`, \`${prefix[0]}yasaklıkomut\`, \`${prefix[0]}logsistemi\`, \`${prefix[0]}sunucubakım\`, \`${prefix[0]}oto-rol\`, \`${prefix[0]}oto-tag\`
`)


      )
    }

    if (!sec) {
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(client.ayarlar.footer).setDescription(`
\`\`\`SUNUCU KURULUM\`\`\`
${await db.has(`sunucuayar.sunucu_id`) ? `${emoji} **Sunucu ID'si** (\`${await db.get(`sunucuayar.sunucu_id`)}\`)` : `${emoji2} **Sunucu ID'si**`}
${await db.has(`sunucuayar.sunucu_link`) ? `${emoji} **Sunucu Link** (\`${await db.get(`sunucuayar.sunucu_link`)}\`)` : `${emoji2} **Sunucu Link**`}
${await db.has(`sunucuayar.sunucu_tag`) ? `${emoji} **Sunucu TAGI** (\`${await db.get(`sunucuayar.sunucu_tag`)}\`) / (\`${db.get(`sunucuayar.tag2`) || "2.Tag Kurulmamış"}\`)` : `${emoji2} **Sunucu TAGI**`}
${await db.has(`sunucuayar.sunucu_foto`) ? `${emoji} **Sunucu Foto**` : `${emoji2} **Sunucu Foto**`}
${await db.has(`sunucuayar.yasak_tur`) ? `${emoji} **Yasak Türü** (\`${await db.get(`sunucuayar.yasak_tur`)}\`)` : `${emoji} **Yasak Türü** (\`jail\`)`}
\`\`\`KANAL KURULUM\`\`\`
${await db.has(`sunucuayar.sohbet_kanal`) ? `${emoji} **Sohbet Kanalı** (<#${await db.get(`sunucuayar.sohbet_kanal`)}>)` : `${emoji2} **Sohbet Kanalı**`}
${await db.has(`sunucuayar.kayit_kanal`) ? `${emoji} **Kayıt Kanalı** (<#${await db.get(`sunucuayar.kayit_kanal`)}>)` : `${emoji2} **Kayıt Kanalı**`}
${await db.has(`sunucuayar.jail_kanal`) ? `${emoji} **Jail Bilgi Kanalı** (<#${await db.get(`sunucuayar.jail_kanal`)}>)` : `${emoji2} **Jail Kanalı**`}
${await db.has(`sunucuayar.ekip_log_kanal`) ? `${emoji} **Ekip Log Kanalı** (<#${await db.get(`sunucuayar.ekip_log_kanal`)}>)` : `${emoji2} **Ekip Log Kanalı**`}
${await db.has(`sunucuayar.kurallar_kanal`) ? `${emoji} **Kurallar Kanalı** (<#${await db.get(`sunucuayar.kurallar_kanal`)}>)` : `${emoji2} **Kurallar Kanalı**`}
${await rolAyarlarDB.has(`rolayarlar.ceza_puan_kanal`) ? `${emoji} **Ceza Puan Kanalı** (<#${await rolAyarlarDB.get(`rolayarlar.ceza_puan_kanal`)}>)` : `${emoji2} **Ceza Puan Kanalı**`}
${await db.has(`sunucuayar.sleep_kanal`) ? `${emoji} **Sleep Kanalı** (<#${await db.get(`sunucuayar.sleep_kanal`)}>)` : `${emoji2} **Sleep Kanalı**`}
\`\`\`ROL KURULUM\`\`\`
${await db.has(`sunucuayar.vkyonetici`) ? `${emoji} **VK Yönetici** (<@&${await db.get(`sunucuayar.vkyonetici`)}>)` : `${emoji2} **VK Yönetici**`}
${await db.has(`sunucuayar.kayitsiz_uye`) ? `${emoji} **Kayıtsız Uye Rol** (${await db.get(`sunucuayar.kayitsiz_uye`).map(c => `<@&${c}>`)})` : `${emoji2} **Kayıtsız Uye Rol**`}
${await db.has(`sunucuayar.erkek_rol`) ? `${emoji} **Erkek Rol** (${await db.get(`sunucuayar.erkek_rol`).map(c => `<@&${c}>`)})` : `${emoji2} **Erkek Rol**`}
${await db.has(`sunucuayar.kadin_rol`) ? `${emoji} **Kadın Rol** (${await db.get(`sunucuayar.kadin_rol`).map(c => `<@&${c}>`)})` : `${emoji2} **Kadın Rol**`}
${await db.has(`sunucuayar.ekip_rol`) ? `${emoji} **Ekip Rol** (<@&${await db.get(`sunucuayar.ekip_rol`)}>)` : `${emoji2} **Ekip Rol**`}
${await db.has(`sunucuayar.booster_rol`) ? `${emoji} **Booster Rol** (<@&${await db.get(`sunucuayar.booster_rol`)}>)` : `${emoji2} **Booster Rol**`}
${await db.has(`sunucuayar.jail_rol`) ? `${emoji} **Jail Rol** (<@&${await db.get(`sunucuayar.jail_rol`)}>)` : `${emoji2} **Jail Rol**`}
${await db.has(`sunucuayar.supheli_rol`) ? `${emoji} **Supheli Rol** (<@&${await db.get(`sunucuayar.supheli_rol`)}>)` : `${emoji2} **Supheli Rol**`}
${await db.has(`sunucuayar.yasaklitag_rol`) ? `${emoji} **Yasaklı Tag Rol** (<@&${await db.get(`sunucuayar.yasaklitag_rol`)}>)` : `${emoji2} **Yasaklı Tag Rol**`}
${await db.has(`sunucuayar.muted_rol`) ? `${emoji} **Muted Rol** (<@&${await db.get(`sunucuayar.muted_rol`)}>)` : `${emoji2} **Muted Rol**`}
${await db.has(`sunucuayar.voice_muted_rol`) ? `${emoji} **Voice Muted Rol** (<@&${await db.get(`sunucuayar.voice_muted_rol`)}>)` : `${emoji2} **Voice Muted Rol**`}

**Bilgilendirme:** Kurulum yapmak için \`${prefix[0]}kurulum yardım\` yazabilirsiniz
`))

    }




    if (sec == "sunucuid" || sec == "id") {
      const komut = args.slice(1).join(' ');
      if (!komut) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum sunucuid <sunucu idniz>`)
      }
      await db.set(`sunucuayar.sunucu_id`, komut)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${komut} id'si sunucu idsi yaptınız **`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (sec == "link" || sec == "sunuculink") {
      const komut = args.slice(1).join(' ');
      if (!komut) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum link <sunucu linkiniz>`)
      }
      await db.set(`sunucuayar.sunucu_link`, komut)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde \`${komut}\` linki sunucu linkiniz yaptınız **`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (sec == "sunucufoto" || sec == "foto") {
      const komut = args.slice(1).join(' ');
      if (!komut) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum sunucufoto <sunucufoto linkiniz>`)
      }
      await db.set(`sunucuayar.sunucu_foto`, komut)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde \`${komut}\` linki sunucufoto linkiniz yaptınız **`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (sec == "yasak_tur" || sec == "yasaktürü" || sec == "yasaktur") {
      const komut = args[1]
      let embed = new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
      **Genel Kurulum,**
      ${emoji3} **Başarılı bir şekilde yasak türünü \`${komut}\` yaptınız **`)
      if (komut == "ban") {
        await db.set(`sunucuayar.yasak_tur`, komut)
        return message.channel.send(embed).then(xyz => xyz.delete({timeout: 5000}))
      } else if (komut == "jail") {
        await db.set(`sunucuayar.yasak_tur`, komut)
        return message.channel.send(embed).then(xyz => xyz.delete({timeout: 5000}))
      } else {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum yasaktürü ban/jail`)
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if (sec == "tag" || sec == "sunucutag") {
      const komut = args.slice(1).join(' ');
      if (!komut) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum tag <tagınız>`)
      }
      await db.set(`sunucuayar.sunucu_tag`, komut)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **\`${komut}\` Sunucu tagınız olarak tanımlanmıştır **`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if (sec == "kayit-kanal" || sec == "kayıtkanal" || sec == "register-chat") {
      const kanal = message.mentions.channels.first()
      if (!kanal) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum kayit-kanal #kayıtkanalı`)
      }
      await db.set(`sunucuayar.kayit_kanal`, kanal.id)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **${kanal} kanalı kayıt kanalı olarak tanımlanmıştır**`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if (sec == "kurallar-kanal" || sec == "kurallar" || sec == "kurallarkanal") {
      const kanal = message.mentions.channels.first()
      if (!kanal) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum kurallar-kanal #kurallarkanalı`)
      }
      await db.set(`sunucuayar.kurallar_kanal`, kanal.id)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **${kanal} kanalı kurallar kanalı olarak tanımlanmıştır**`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (sec == "sleep-kanal" || sec == "sleepingroom" || sec == "sleepkanal") {
      const kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
      if (!kanal) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum sleep-kanal #sleepkanal`)
      }
      await db.set(`sunucuayar.sleep_kanal`, kanal.id)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **${kanal} kanalı Sleeping Room kanalı olarak tanımlanmıştır**`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (sec == "cezapuan-kanal" || sec == "cezapuan" || sec == "cezapuankanal") {
      const kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
      if (!kanal) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum cezapuan-kanal #sleepkanal`)
      }
      rolAyarlarDB.set(`rolayarlar.ceza_puan_kanal`, kanal.id)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **${kanal} kanalı Ceza Puan kanalı olarak tanımlanmıştır**`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }
    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if (sec == "jail-kanal" || sec == "karantinakanal") {
      const kanal = message.mentions.channels.first()
      if (!kanal) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum jail-kanal #jailkanalı`)
      }
      await db.set(`sunucuayar.jail_kanal`, kanal.id)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **${kanal} kanalı jail kanalı olarak tanımlanmıştır**`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if (sec == "ekip-kanal" || sec == "taglog" || sec == "taglog-kanal") {
      const kanal = message.mentions.channels.first()
      if (!kanal) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum ekip-kanal #ekipkanalı`)
      }
      await db.set(`sunucuayar.ekip_log_kanal`, kanal.id)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **${kanal} kanalı ekip kanalı olarak tanımlanmıştır**`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if (sec == "sohbet-kanal" || sec == "genel-chat") {
      const kanal = message.mentions.channels.first()
      if (!kanal) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum sohbet-kanal #sohbetkanalı`)
      }
      await db.set(`sunucuayar.sohbet_kanal`, kanal.id)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **${kanal} kanalı sohbet kanalı olarak tanımlanmıştır**`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (sec == "vkyonetici" || sec == "vkyönetici") {
      const rol = message.mentions.roles.first()
      if (!rol) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum yoklama @yoklama sorumlusu`)
      }
      await db.set(`sunucuayar.vkyonetici`, rol.id);
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde <@&${rol.id}> rolünü VK Yönetici yaptınız **`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (sec == "kayitsizuye" || sec == "unregister" || sec == "kayıtsız") {

      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`**Bu özelliği** \`${prefix[0]}otorol #kanal @kayitsizuyerol1 (isterseniz @kayitsizuyerol2)\` **şeklinde kurabilirsiniz**`)

      message.channel.send(embed).catch(err => console.log("Kurulum sisteminde mesaj göndeirken bir hata ile karşılaştım"))
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (sec == "erkek" || sec == "adam" || sec == "man" || sec == "delikanlı") {
      /////////////////////////////////////////
      let roles;

      if (message.mentions.roles.size >= 1) {
        roles = message.mentions.roles.map(r => r.id);

      } else {
        if (!roles) {
          return message.reply("Doğru Kullanım: " + prefix[0] + "kurulum erkek @erkekrol1 @erkekrol2")
        }
        roles = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
      }


      await db.set(`sunucuayar.erkek_rol`, roles);
      ///////////////////////////////////////////////
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${roles.map(r => message.guild.roles.cache.get(r).toString()).join(",")} rolünü yaptınız **`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (sec == "kız" || sec == "kadın" || sec == "woman" || sec == "gacı" || sec == "kadin" || sec == "kiz") {
      /////////////////////////////////////////
      let roles;

      if (message.mentions.roles.size >= 1) {
        roles = message.mentions.roles.map(r => r.id);

      } else {
        if (!roles) {
          return message.reply("Doğru Kullanım: " + prefix[0] + "kurulum kız @kızrol1 @kızrol2")
        }
        roles = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
      }


      await db.set(`sunucuayar.kadin_rol`, roles);
      ///////////////////////////////////////////////
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${roles.map(r => message.guild.roles.cache.get(r).toString()).join(",")} rolünü yaptınız **`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (sec == "ekip" || sec == "family" || sec == "taglıüye" || sec == "aile" || sec == "ekip-rol") {
      const rol = message.mentions.roles.first()
      if (!rol) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum ekip @ekipüye`)
      }
      await db.set(`sunucuayar.ekip_rol`, rol.id)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${rol} rolünü yaptınız **`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (sec == "boost" || sec == "booster") {
      const rol = message.mentions.roles.first()
      if (!rol) {
        return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum boost @ekipüye`)
      }
      await db.set(`sunucuayar.booster_rol`, rol.id)
      return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${rol} rolünü yaptınız **`)).then(xyz => xyz.delete({
        timeout: 5000
      }))
    }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (sec == "supheli" || sec == "tehlikeli" || sec == "şüpheli") {
    const rol = message.mentions.roles.first()
    if (!rol) {
      return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum supheli @supheli sorumlusu`)
    }
    await db.set(`sunucuayar.supheli_rol`, rol.id)
    return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${rol} rolünü Supheli Sorumlusu yaptınız **`)).then(xyz => xyz.delete({
      timeout: 5000
    }))
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (sec == "jailcezali" || sec == "jail" || sec == "cezalı" || sec == "karantina") {

    const rol = message.mentions.roles.first()
    if (!rol) {
      return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum jailcezali @jailcezali`)
    }
    await db.set(`sunucuayar.jail_rol`, rol.id)
    return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${rol} rolünü Jailcezali Sorumlusu yaptınız **`)).then(xyz => xyz.delete({
      timeout: 5000
    }))
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (sec == "yasaklıtag" || sec == "yasakli-tag" || sec == "yasaklı-tag") {

    const rol = message.mentions.roles.first()
    if (!rol) {
      return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum jailcezali @jailcezali`)
    }
    await db.set(`sunucuayar.yasaklitag_rol`, rol.id)
    return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${rol} rolünü Jailcezali Sorumlusu yaptınız **`)).then(xyz => xyz.delete({
      timeout: 5000
    }))
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (sec == "muted" || sec == "mute" || sec == "sustur") {

  const rol = message.mentions.roles.first()
  if (!rol) {
    return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum muted @mutedrol`)
  }
  await db.set(`sunucuayar.muted_rol`, rol.id)
  return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${rol} rolünü Jailcezali Sorumlusu yaptınız **`)).then(xyz => xyz.delete({
    timeout: 5000
  }))
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (sec == "voicemuted" || sec == "voicemute" || sec == "seslisustur") {

  const rol = message.mentions.roles.first()
  if (!rol) {
    return message.reply(`Doğru Kullanım: ${prefix[0]}kurulum voicemuted @voicemutedrol`)
  }
  await db.set(`sunucuayar.voice_muted_rol`, rol.id)
  return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${rol} rolünü Jailcezali Sorumlusu yaptınız **`)).then(xyz => xyz.delete({
    timeout: 5000
  }))
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (sec == "kayıtsorumlusu" || sec == "registerhammer" || sec == "register" || sec == "kayıt-sorumlusu" || sec == "kayitsorumlusu" || sec == "kayit-sorumlusu") {
  let roles;

  if (message.mentions.roles.size >= 1) {
    roles = message.mentions.roles.map(r => r.id);

  } else {
    if (!roles) {
      return message.reply("Doğru Kullanım: " + prefix[0] + "kurulum kayıt-sorumlusu @rol1 @rol2")
    }
    roles = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
  }
  await rolAyarlarDB.set(`rolayarlar.kayit_sorumlusu`, roles);
  ///////////////////////////////////////////////
  return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${roles.map(r => message.guild.roles.cache.get(r).toString()).join(",")} rolünü yaptınız **`)).then(xyz => xyz.delete({
    timeout: 5000
  }))
}
if (sec == "ozel-rol-sorumlusu" || sec == "özel-rol-sorumlusu" || sec == "özelkomut") {
  let roles;

  if (message.mentions.roles.size >= 1) {
    roles = message.mentions.roles.map(r => r.id);

  } else {
    if (!roles) {
      return message.reply("Doğru Kullanım: " + prefix[0] + "kurulum özel-rol-sorumlusu @rol1 @rol2")
    }
    roles = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
  }
  await rolAyarlarDB.set(`rolayarlar.genel_rol_sorumlusu`, roles);
  ///////////////////////////////////////////////
  return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`
**Genel Kurulum,**
${emoji3} **Başarılı bir şekilde ${roles.map(r => message.guild.roles.cache.get(r).toString()).join(",")} rolünü yaptınız **`)).then(xyz => xyz.delete({
    timeout: 5000
  }))
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
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kurulum',
  description: 'Sunucunun kurulum sistemlerini gerçekleştirebilirsiniz',
  usage: 'kurulum yardım',
  kategori: 'Sahip 2'
};