const {
  MessageEmbed, DiscordAPIError
} = require('discord.js');
const ms = require("ms");
let qdb = require("quick.db");
const moment = require("moment");
moment.locale("tr")
const DBLAPI = require('dblapi.js');
require("moment-duration-format");
exports.run = async (client, message, args) => {
  if (!message.guild) return

  let prefixDB = new qdb.table("prefix")
  let rolAyarlarDB = new qdb.table("rolayarlar")
  let profilDB = new qdb.table("profil")
  let cezaDB = new qdb.table("cezalar");

  let prefix = await prefixDB.get(`prefix`) || client.ayarlar.prefix;

  let seçim = args[0];
  if (seçim == "bilgi") {
    let arr = await rolAyarlarDB.get(`rolayarlar.ban_sorumlusu`) || [];
    let arr2 = await rolAyarlarDB.get(`rolayarlar.ban_users`) || ["751524861205282969"];
    if (!message.member.permissions.has(8) && !message.member.roles.cache.some(e => arr.some(x => x == e)) && !message.members.cache.some(x => arr2.some(e => e == x))) return message.reply("Bu komutu kullanabilmek için gerekli izne sahip değilsin!")

    let embed = new MessageEmbed()
      .setTitle(`BAN/YASAKLAMA Nedir?`)
      .setColor("RANDOM")
      .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699061417982165033/Melancholy.gif")
      .setDescription(`Sunucu içerisinde olumsuz davranışlar sergileyen veya sunucu kurallarının dışına çıkan ya da isteğe bağlı bir şekilde sunucudan uzaklaştırılmasını sağlayan ceza sistemidir.`)
      .addField(`:question: **Nasıl kullanılır?**`, `Ban Atmak için \`${prefix[0]}ban @etiket [sebep]\` komutunu kullan.`)
      .addField(`:grey_question: **Cezayı nasıl kaldıracağım?**`, `aili kaldırmak için \`${prefix[0]}unban ID\` komutunu kullan.`)
      .addField(":question: **Komutu kimler kullanabilir?**", "Bu komutu **Yönetici** - **Üyeleri Yasakla** ya da **Ban Sorumlusu** yetkisine sahip olan kişiler kullanabilir.")
      .addField(`:grey_question: **Belirlediğim rollere koyabiliyor muyum?**`, `Eğer belirlediğin rollere koymak istiyorsan bunun için \n\`${prefix[0]}ban yetkiler [roller/idler]\` komutunu kullanmalısın.`)
      .addField(`:grey_question: **Belirlediğim kişileri koyabiliyor muyum?**`, `Eğer belirlediğin kişileri koymak istiyorsan bunun için \n\`${prefix[0]}ban kişiler [kişiler/idler]\` komutunu kullanmalısın.`)
      .addField(`:question: **Belirlediğim kanala loglatabiliyor muyum?**`, `Eğer belirlediğin kanala loglatmak isteiyorsan bunun için \n\`${prefix[0]}ban kanal [kanal/id]\` komutunu kullanmalısın.`)
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
          .setDescription(`Sanırsam rolleri eklemeyi unuttun bu komut hakkında bilgi edinmek için \`${prefix[0]}ban bilgi\` kullanmayı dene.`)
          .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}ban yetkiler @rol1 @rol2 @rol3\`\`\``, true)
          .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
          .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}ban yetkiler ID1 ID2 ID3\`\`\``, true)
          .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL({
            dynamic: true
          })));

      if (roles.length > 5)
        return await message.channel.send(new MessageEmbed()
          .setColor("#FF6553")
          .setTitle(":x: Komutu Yanlış Kullandın! :x:")
          .setDescription("Ban rolü olarak sadece `5` tane rol belirlenebilir. Sen ise " + roles.length + " kadar rol eklemeye çalıştın.")
          .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
          .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL()))

      await rolAyarlarDB.set(`rolayarlar.ban_sorumlusu`, roles);
      let embed = new MessageEmbed()
        .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL())
        .setColor("#53FF75")
        .setDescription("Ban/Yasaklama sistemini artık aşağıdaki role sahip kişiler kullanabilecek!")
        .addField(":question: Yetkiler", message.guild.roles.cache.filter(r => roles.some(d => d == r.id)).map(r => r.id).map((r, index) => (index + 1) + "- " + message.guild.roles.cache.get(r).toString()).join("\n"))
      return await message.channel.send(embed);
    }
    if (seçim == "kanal") {
      let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
      if (!kanal)
      return await message.channel.send(new MessageEmbed()
      .setColor("#FF6553")
      .setTitle(":x: Komutu Yanlış Kullandın! :x:")
      .setDescription(`Sanırsam kanal eklemeyi unuttun bu komut hakkında bilgi edinmek için \`${prefix[0]}ban bilgi\` kullanmayı dene.`)
      .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}ban kanal #kanal\`\`\``, true)
      .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
      .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}ban kanal ID\`\`\``, true)
      .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL({
        dynamic: true
      })));
      await rolAyarlarDB.set(`rolayarlar.ban_kanal`, kanal.id);
      let embed = new MessageEmbed()
        .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL())
        .setColor("#53FF75")
        .setDescription("Başarılı bir şekilde <#" + kanal + "> kanalını ban log kanalı olarak tanımladınız!")
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
      .setDescription(`Sanırsam kişileri eklemeyi unuttun bu komut hakkında bilgi edinmek için \`${prefix[0]}ban bilgi\` kullanmayı dene.`)
      .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}ban kişiler @etiket1 @etiket2\`\`\``, true)
      .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
      .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}ban kişiler ID1 ID2\`\`\``, true)
      .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL({
        dynamic: true
      })));
      if (users.length > 10)
      return await message.channel.send(new MessageEmbed()
        .setColor("#FF6553")
        .setTitle(":x: Komutu Yanlış Kullandın! :x:")
        .setDescription("Ban kişileri olarak sadece `10` tane kişi belirlenebilir. Sen ise " + users.length + " kadar kişi eklemeye çalıştın.")
        .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
        .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL()))

        await rolAyarlarDB.set(`rolayarlar.ban_users`, users)
      let embed = new MessageEmbed()
        .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL())
        .setColor("#53FF75")
        .setDescription("Ban/Yasaklama sistemini artık aşağıdaki kişiler kullanabilecek!")
        .addField(":question: Kişiler", message.guild.members.cache.filter(r => users.some(d => d == r.id)).map(r => r.id).map((r, index) => (index + 1) + "- " + message.guild.members.cache.get(r).toString()).join("\n"))
      return await message.channel.send(embed);
    }
    if (seçim == "limit") {
      let limit = args[1];
      await rolAyarlarDB.set(`rolayarlar.ban_limit`, limit);
      return message.channel.send("Başarılı bir şekilde ban limitini " + limit + " olarak tanımladınız.");
    }
  }

  let arr = await rolAyarlarDB.get(`rolayarlar.ban_sorumlusu`) || []
  let arr2 = await rolAyarlarDB.get(`rolayarlar.ban_users`) || ["751524861205282969"]
  if (!message.member.permissions.has(8) && !message.member.roles.cache.some(e => arr.some(x => x == e)) && !message.members.cache.some(x => arr2.some(e => x == e))) return message.reply("Bu komutu kullanabilmek için gerekli izne sahip değilsin!")
  
  let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = (args.splice(1).join(" ") || "YOK");
  let banLogChannel = message.guild.channels.cache.get(await rolAyarlarDB.get(`rolayarlar.ban_kanal`));
  let cezapuanLogChannel = message.guild.channels.cache.get(await rolAyarlarDB.get(`rolayarlar.ceza_puan_kanal`));
  let zaman = moment(Date.now()).format('DD.MM.YYYY - HH:MM')
// ihtimaller
let limit = await rolAyarlarDB.get(`rolayarlar.ban_limit`)
if (!limit) return message.reply("Lütfen ban limitini belirleyiniz `" + prefix[0] + "ban limit <miktar>`")
if (!target) return message.reply("Lütfen bir kullanıcı etiketleyiniz!")
let limituser = await rolAyarlarDB.get(`rolayarlar.${message.author.id}.ban_limit`) || 0;
let ban_kontrol = await rolAyarlarDB.get(`ban_limit_kontrol`);
if (limituser >= limit) {
  if (!ban_kontrol) {
    await rolAyarlarDB.set(`ban_limit_kontrol`, Date.now())
}
  return message.reply("12 Saat Boyunca Bu Komut Kullanıma Kapatılmıştır!")
}
if (!message.guild.member(target).bannable) return message.reply('Etiketlediğiniz kişi benden üst bir role sahip banlayamıyorum').then(x => x.delete({timeout: 5000})).catch(err => { });
let mesajembed2 = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.ayarlar.footer).setColor("RANDOM").setTimestamp();
if (message.member.roles.highest.position <= target.roles.highest.position) return message.channel.send(mesajembed2.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  
if (target.id === message.author.id) return message.reply("Bu işlemi kendi üzerinde gerçekleştiremezsin!").then(x => x.delete({timeout: 5000})).catch(err => { });
//ihtimaller bitiş
let cezaID = await cezaDB.get(`cezaID`);
if (!await cezaDB.get(`cezaID`))
cezaID = await cezaDB.set(`cezaID`, 1);


let cezaPuan = await cezaDB.get(`cezaPoint_${target.id}`);
if (!await cezaDB.get(`cezaPoint_${target.id}`))
cezaPuan = await cezaDB.set(`cezaPoint_${target.id}`, 200);

  let cezapuanembed = `${target} aldığınız **#${cezaID}** ID'li ceza ile **${cezaPuan}** ceza puanına ulaştınız.`

  let banembed =
   new MessageEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .setFooter(client.ayarlar.footer)
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setImage("https://cdn.discordapp.com/attachments/751526628340793427/781384793207472158/bangif4.gif")
  .setDescription(`**${target} Üyesi Sunucudan ${reason} Sebebiyle \n${message.author} Tarafından banlandı! Ceza Numarası:** (\`#${cezaID}\`)`)
  

  let logembed =
  new MessageEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .setFooter(client.ayarlar.footer)
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setDescription(`
• Ceza ID: \`#${cezaID}\`
• Yasaklanan Üye: ${target.tag} (\`${target.id}\`)
• Yasaklayan Yetkili: ${message.author} (\`${message.author.id}\`)
• Yasaklanma Tarihi: \`${moment(Date.now()).format('LLL')}\`
• Yasaklanma Sebebi: [\`${reason}\`]
  `)

      if (!banLogChannel) {
      await message.guild.members.ban(target.id).catch(() => { })

      await message.channel.send(banembed);
      await rolAyarlarDB.add(`rolayarlar.${message.author.id}.ban_limit`, 1);
      await dataIslemler(target, message, reason, cezaDB)

  } else {
      await message.guild.members.ban(target.id).catch((err) => { console.log(err) })
      await message.channel.send(banembed);
      await client.channels.cache.get(banLogChannel.id).send(logembed);
      await client.channels.cache.get(cezapuanLogChannel.id).send(cezapuanembed);
      await rolAyarlarDB.add(`rolayarlar.${message.author.id}.ban_limit`, 1);
      await dataIslemler(target, message, reason, cezaDB)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ban', 'banla', 'yasakla', 'idam', 'yargı'],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: "Etiketlenen üyeyi banlamaya yaramaktadır",
  usage: 'ban <üye> <sebep>',
  kategori: 'Moderasyon'
};

async function dataIslemler(target, message, reason, cezaDB) {
  let cezaID = await cezaDB.get(`cezaID`);
  if (!await cezaDB.get(`cezaID`))
  cezaID = await cezaDB.set(`cezaID`, 1);
  await cezaDB.add(`cezaID`, 1);

  let cezaPuan = await cezaDB.get(`cezaPoint_${target.id}`);
  if (!await cezaDB.get(`cezaPoint_${target.id}`))
  cezaPuan = await cezaDB.set(`cezaPoint_${target.id}`, 200);
  await cezaDB.add(`cezaPoint_${target.id}`, 200);

  await cezaDB.push(`cezalar`, {
    ID: cezaID,
    CezaPuan: cezaPuan,
    Member: target.id,
    Zaman: Date.now(),
    Bitis: "Kalıcı",
    Type: "Ban",
    Sebep: reason,
    Yetkili: message.author.id
});
}
