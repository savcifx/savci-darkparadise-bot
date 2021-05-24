const {
  MessageEmbed
} = require('discord.js');
const ms = require("ms");
let qdb = require("quick.db");
const moment = require("moment");
moment.locale("tr")
require("moment-duration-format");
exports.run = async (client, message, args) => {
  if (!message.guild) return


  let prefixDB = new qdb.table("prefix");
  let rolAyarlarDB = new qdb.table("rolayarlar");
  let profilDB = new qdb.table("profil");
  let sunucuAyarDB = new qdb.table("sunucuayar");
  let cezaDB = new qdb.table("cezalar");  

  let prefix = await prefixDB.get(`prefix`) || client.ayarlar.prefix;

  let seçim = args[0]
  if (seçim == "bilgi") {
    let arr = await rolAyarlarDB.get(`rolayarlar.mute_sorumlusu`) || []
    let arr2 = await rolAyarlarDB.get(`rolayarlar.mute_users`) || ["751524861205282969"]
    if (!message.member.permissions.has(8) && !message.member.permissions.has("MUTE_MEMBERS") && !message.member.roles.cache.some(e => arr.some(x => x == e)) && !message.members.cache.some(x => arr2.some(e => e == x))) return message.reply("Bu komutu kullanabilmek için gerekli izne sahip değilsin!")

    let embed = new MessageEmbed()
      .setTitle(`Susturma Nedir?`)
      .setColor("RANDOM")
      .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699061417982165033/Melancholy.gif")
      .setDescription(`Sunucu içerisinde olumsuz davranışlar sergileyen veya sunucu kurallarının dışına çıkan ya da isteğe bağlı bir şekilde sohbete/sesli sohbette konuşamaması/yazamaması için verilen cezadır.`)
      .addField(`:question: **Nasıl kullanılır?**`, `Susturmak için \`${prefix[0]}mute @etiket [sebep] [süre]\` komutunu kullan.`)
      .addField(`:grey_question: **Cezayı nasıl kaldıracağım?**`, `Susturmayı kaldırmak için \`${prefix[0]}unmute @etiket\` komutunu kullan.`)
      .addField(":question: **Komutu kimler kullanabilir?**", "Bu komutu **Yönetici** - **Mute Sorumlusu** ya da **Üyeleri Sustur** yetkisine sahip olan kişiler kullanabilir.")
      .addField(`:grey_question: **Belirlediğim rollere koyabiliyor muyum?**`, `Eğer belirlediğin rollere koymak istiyorsan bunun için \n\`${prefix[0]}mute yetkiler [roller/idler]\` komutunu kullanmalısın.`)
      .addField(`:grey_question: **Belirlediğim kişileri koyabiliyor muyum?**`, `Eğer belirlediğin kişileri koymak istiyorsan bunun için \n\`${prefix[0]}mute kişiler [kişiler/idler]\` komutunu kullanmalısın.`)
      .addField(`:question: **Belirlediğim kanala loglatabiliyor muyum?**`, `Eğer belirlediğin kanala loglatmak isteiyorsan bunun için \n\`${prefix[0]}mute kanal [kanal/id]\` komutunu kullanmalısın.`)

      .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL());
    return await message.channel.send(embed);
  }



  if (message.member.permissions.has("ADMINISTRATOR") && seçim != "bilgi") {
    if (seçim == "yetkiler") {
      let roles;
      if (message.mentions.roles.size > 0)
        roles = message.mentions.roles.map(r => r.id);
      else
        roles = args.splice(0).filter(e => message.guild.roles.cache.get(e) != undefined);
      if (roles.length <= 0)
        return await message.channel.send(new MessageEmbed()
          .setColor("#FF6553")
          .setTitle(":x: Komutu Yanlış Kullandın! :x:")
          .setDescription("Sanırsam rolleri eklemeyi unuttun bu komut hakkında bilgi edinmek için `l!mute bilgi` kullanmayı dene.")
          .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}mute yetkiler @rol1 @rol2 @rol3\`\`\``, true)
          .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
          .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}mute yetkiler ID1 ID2 ID3\`\`\``, true)
          .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL({
            dynamic: true
          })));

      if (roles.length > 5)
        return await message.channel.send(new MessageEmbed()
          .setColor("#FF6553")
          .setTitle(":x: Komutu Yanlış Kullandın! :x:")
          .setDescription("Susturma rolü olarak sadece `5` tane rol belirlenebilir. Sen ise " + roles.length + " kadar rol eklemeye çalıştın.")
          .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
          .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL()))

      await rolAyarlarDB.set(`rolayarlar.mute_sorumlusu`, roles);
      let embed = new MessageEmbed()
        .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL())
        .setColor("#53FF75")
        .setDescription("Susturma/Mute sistemini artık aşağıdaki role sahip kişiler kullanabilecek!")
        .addField(":question: Yetkiler", message.guild.roles.cache.filter(r => roles.some(d => d == r.id)).map(r => r.id).map((r, index) => (index + 1) + "- " + message.guild.roles.cache.get(r).toString()).join("\n"))
      return await message.channel.send(embed);
    }
    if (seçim == "kanal") {
      let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
      if (!kanal)
        return await message.channel.send(new MessageEmbed()
          .setColor("#FF6553")
          .setTitle(":x: Komutu Yanlış Kullandın! :x:")
          .setDescription(`Sanırsam kanal eklemeyi unuttun bu komut hakkında bilgi edinmek için \`${prefix[0]}mute bilgi\` kullanmayı dene.`)
          .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}mute kanal #kanal\`\`\``, true)
          .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
          .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}mute kanal ID\`\`\``, true)
          .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL({
            dynamic: true
          })));
      await rolAyarlarDB.set(`rolayarlar.mute_kanal`, kanal.id);
      let embed = new MessageEmbed()
        .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL())
        .setColor("#53FF75")
        .setDescription("Başarılı bir şekilde <#" + kanal + "> kanalını mute log kanalı olarak tanımladınız!")
      return await message.channel.send(embed);
    }
    if (seçim == "kişiler") {
      let users;
      if (message.mentions.members.size > 0)
        users = message.mentions.members.map(r => r.id);
      else
        users = args.splice(0).filter(e => message.guild.members.cache.get(e) != undefined);
      if (users.length <= 0)
        return await message.channel.send(new MessageEmbed()
          .setColor("#FF6553")
          .setTitle(":x: Komutu Yanlış Kullandın! :x:")
          .setDescription(`Sanırsam kişileri eklemeyi unuttun bu komut hakkında bilgi edinmek için \`${prefix[0]}mute bilgi\` kullanmayı dene.`)
          .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}mute kişiler @etiket1 @etiket2\`\`\``, true)
          .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
          .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}mute kişiler ID1 ID2\`\`\``, true)
          .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL({
            dynamic: true
          })));
      if (users.length > 10)
        return await message.channel.send(new MessageEmbed()
          .setColor("#FF6553")
          .setTitle(":x: Komutu Yanlış Kullandın! :x:")
          .setDescription("Mute kişileri olarak sadece `10` tane kişi belirlenebilir. Sen ise " + users.length + " kadar kişi eklemeye çalıştın.")
          .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
          .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL()))

          await rolAyarlarDB.set(`rolayarlar.mute_users`, users)
      let embed = new MessageEmbed()
        .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL())
        .setColor("#53FF75")
        .setDescription("Mute/Susturma sistemini artık aşağıdaki kişiler kullanabilecek!")
        .addField(":question: Kişiler", message.guild.members.cache.filter(r => users.some(d => d == r.id)).map(r => r.id).map((r, index) => (index + 1) + "- " + message.guild.members.cache.get(r).toString()).join("\n"))
      return await message.channel.send(embed);
    }
    if (seçim == "limit") {
      let limit = args[1];
      await rolAyarlarDB.set(`rolayarlar.mute_limit`, limit);
      return message.channel.send("Başarılı bir şekilde mute limitini " + limit + " olarak tanımladınız.");
    }
  }

  let arr = await rolAyarlarDB.get(`rolayarlar.mute_sorumlusu`) || []
  let arr2 = await rolAyarlarDB.get(`rolayarlar.mute_users`) || ["751524861205282969"]
  if (!message.member.permissions.has(8) && !message.member.roles.cache.some(e => arr.some(x => x == e)) && !message.members.cache.some(x => arr2.some(e => x == e))) return message.reply("Bu komutu kullanabilmek için gerekli izne sahip değilsin!")
  
  let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let muteTime = args[1];
  let reason = (args.splice(2).join(" ") || "YOK");
  let mute = await sunucuAyarDB.get(`sunucuayar.muted_rol`);
  if (!mute) return message.reply("Bu komutun kullanılabilmesi için Muted Rolünün tanımlanması gerekiyor! ``" + prefix[0] + "kurulum muted @mutedrol`` şeklinde kurabilirsiniz")

  let muteLogChannel = message.guild.channels.cache.get(await rolAyarlarDB.get(`rolayarlar.mute_kanal`));
  let cezapuanLogChannel = message.guild.channels.cache.get(await rolAyarlarDB.get(`rolayarlar.ceza_puan_kanal`));
  let zaman = moment(Date.now()).format('DD.MM.YYYY - HH:MM')
  // ihtimaller
  let jail = await sunucuAyarDB.get(`sunucuayar.jail_rol`);
  if (!jail) return message.reply("Bu komutun kullanılabilmesi için Jail Rolünün tanımlanması gerekiyor! ``" + prefix[0] + "kurulum jail @jailrol`` şeklinde kurabilirsiniz")
  let boosterRol = await sunucuAyarDB.get(`sunucuayar.booster_rol`)
  if (!boosterRol) return message.reply("Bu komutun kullanılabilmesi için Booster Rolünün tanımlanması gerekiyor! ``" + prefix[0] + "kurulum booster @boosterrol`` şeklinde kurabilirsiniz")
  
  let limit = await rolAyarlarDB.get(`rolayarlar.mute_limit`)
  if (!limit) return message.reply("Lütfen mute limitini belirleyiniz `" + prefix[0] + "mute limit <miktar>`")
  if (!target) return message.reply("Lütfen bir kullanıcı etiketleyiniz!")
  if (!muteTime) return message.reply("Lütfen bir süre belirleyiniz (1m/1h/1d)");
  let limituser = await rolAyarlarDB.get(`rolayarlar.${message.author.id}.mute_limit`) || 0;
  let mute_kontrol = await rolAyarlarDB.get(`mute_limit_kontrol`);
  if (limituser >= limit) {
    if (!mute_kontrol) {
      await rolAyarlarDB.set(`mute_limit_kontrol`, Date.now())
  }
    return message.reply("12 Saat Boyunca Bu Komut Kullanıma Kapatılmıştır!")
  }
  let mesajembed2 = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(client.ayarlar.footer).setColor("RANDOM").setTimestamp();
  if (message.member.roles.highest.position <= target.roles.highest.position) return message.channel.send(mesajembed2.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({ timeout: 5000 }));

  if (target.id === message.author.id) return message.reply("Bu işlemi kendi üzerinde gerçekleştiremezsin!");
  //ihtimaller bitiş
let cezaID = await cezaDB.get(`cezaID`);
if (!await cezaDB.get(`cezaID`))
cezaID = await cezaDB.set(`cezaID`, 1);
let cezaPuan = await cezaDB.get(`cezaPoint_${target.id}`);
if (!await cezaDB.get(`cezaPoint_${target.id}`))
cezaPuan = await cezaDB.set(`cezaPoint_${target.id}`, 8);
let cezapuanembed = `${target} aldığınız **#${cezaID}** ID'li ceza ile **${cezaPuan}** ceza puanına ulaştınız.`

  let muteembed =
  new MessageEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .setFooter(client.ayarlar.footer)
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setDescription(`**${target} Üyesi Sunucuda ${reason} sebebiyle \n ${message.author} Tarafından Mutelendi! Ceza Numarası:** (\`#${cezaID}\`)`)

  let logembed =
  new MessageEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .setFooter(client.ayarlar.footer)
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setDescription(`
  • Ceza ID: \`#${cezaID}\`
  • Mutelenen Üye: ${target} (\`${target.id}\`)
  • Yetkili: ${message.author} (\`${message.author.id}\`)
  • Mute Başlangıç: \`${moment(Date.now()).format('LLL')}\`
  • Mute Bitiş: \`${moment(Date.now()+ms(args[1])).format('LLL')}\`
  • Mutelendirilme Sebebi: [\`${reason}\`]
  `)




  if (!muteLogChannel) {
    if (target.roles.cache.has(mute)) {
      return message.reply("Etiketlediğin kullanıcı zaten susturulmuş?")
    } else {

      // CEZA SİSTEMİ
      

      

      let data = await cezaDB.get(`cezalar`) || []
      if (data.length <= 0) data = await cezaDB.set(`cezalar`, [])
      if (data.filter(x => x.Member == target.id &&  x.CezaPuan >= 250).map(x => x.CezaPuan)[0]) {
      await target.roles.set(target.roles.cache.get(boosterRol) ? [jail,boosterRol] : [jail])
      let uyari = await profilDB.get(`profil.${target.id}.uyari`);
      uyari.Jail = true;
      await profilDB.set(`profil.${target.id}.uyari`, uyari); // çık gir yapınca tekrar verme
      }
      // CEZA SİSTEMİ BİTİŞ

      await message.channel.send(muteembed)
      await rolAyarlarDB.add(`rolayarlar.${message.author.id}.mute_limit`, 1);
      await target.roles.add(mute);
      
      //* DATA İŞLEMLERİ
      await dataIslemler(profilDB, target, message, reason, args, cezaDB);
      //* DATA BİTİŞ
    }

  } else {
    if (target.roles.cache.has(mute)) {
      return message.reply("Etiketlediğin kullanıcı zaten susturulmuş?")
    } else {

      // CEZA SİSTEMİ
      let db = new qdb.table("cezalar");
      let data = await db.get(`cezalar`) || []
      if (data.length <= 0) data = await db.set(`cezalar`, [])
      if (data.filter(x => x.Member == target.id &&  x.CezaPuan >= 250).map(x => x.CezaPuan)[0]) {
      await target.roles.set(target.roles.cache.get(boosterRol) ? [jail,boosterRol] : [jail])
      let uyari = profilDB.get(`profil.${target.id}.uyari`);
      uyari.Jail = true;
      await profilDB.set(`profil.${target.id}.uyari`, uyari); // çık gir yapınca tekrar verme
      }
      // CEZA SİSTEMİ BİTİŞ

      await message.channel.send(muteembed)
      await client.channels.cache.get(muteLogChannel.id).send(logembed);
      await client.channels.cache.get(cezapuanLogChannel.id).send(cezapuanembed);
      await rolAyarlarDB.add(`rolayarlar.${message.author.id}.mute_limit`, 1);
      await target.roles.add(mute);
      //* DATA İŞLEMLERİ
      await dataIslemler(profilDB, target, message, reason, args, cezaDB);
      //* DATA BİTİŞ

    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tempmute", "geçicisustur", "geçici-sustur", "sürelisustur", "tmute"],
  permLevel: 0
};

exports.help = {
  name: 'mute',
  description: 'Etiketlenen kullanıcıya belirli miktarda mute cezası vermektedir',
  usage: 'mute @etiket <süre(1m/1h/1d)> <sebep>',
  kategori: 'Moderasyon'
};
async function dataIslemler(profilDB, target, message, reason, args, cezaDB) {
  let uyari = await profilDB.get(`profil.${target.id}.uyari`);
  // ÇIK GİR YAPMA UYARISI
  if (!await profilDB.get(`profil.${target.id}.uyari`))
    uyari = await profilDB.set(`profil.${target.id}.uyari`, {
      Mute: false,
      Jail: false,
      Voice_Mute: false,
      Uyari_Miktar: 0,
      Uyari_Son_Miktar: 3
    });
  uyari.Mute = true;
  //uyari bitiş
  await profilDB.set(`profil.${target.id}.uyari`, uyari);
  
  
  let cezaID = await cezaDB.get(`cezaID`);
  if (!await cezaDB.get(`cezaID`))
  cezaID = await cezaDB.set(`cezaID`, 1);
  await cezaDB.add(`cezaID`, 1);

  let cezaPuan = await cezaDB.get(`cezaPoint_${target.id}`);
  if (!await cezaDB.get(`cezaPoint_${target.id}`))
  cezaPuan = await cezaDB.set(`cezaPoint_${target.id}`, 8);
  await cezaDB.add(`cezaPoint_${target.id}`, 8);

  await cezaDB.push(`cezalar`, {
    ID: cezaID,
    CezaPuan: cezaPuan,
    Member: target.id,
    Zaman: Date.now(),
    Bitis: Date.now() + ms(args[1]),
    Type: "Mute",
    Sebep: reason,
    Yetkili: message.author.id
});
}