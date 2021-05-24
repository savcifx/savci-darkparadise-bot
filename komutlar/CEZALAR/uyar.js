const {
    MessageEmbed
  } = require('discord.js');
  const ms = require("ms");
  let qdb = require("quick.db");
  const moment = require("moment");
  require("moment-duration-format");
  exports.run = async (client, message, args) => {
    if (!message.guild) return
  
  
    let prefixDB = new qdb.table("prefix")
    let rolAyarlarDB = new qdb.table("rolayarlar")
    let sunucuAyarDB = new qdb.table("sunucuayar")
    let profilDB = new qdb.table("profil")
    let prefix = await prefixDB.get(`prefix`) || client.ayarlar.prefix;
    let cezaDB = new qdb.table("cezalar");
    
    let arr = await rolAyarlarDB.get(`rolayarlar.jail_sorumlusu`) || []
    if (!message.member.permissions.has(8) && !message.member.roles.cache.some(e => arr.some(x => x == e)) && !message.members.cache.some(x => arr2.some(e => x == e))) return message.reply("Bu komutu kullanabilmek için gerekli izne sahip değilsin!")
    
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = (args.splice(1).join(" ") || "YOK");

    let jail = await sunucuAyarDB.get(`sunucuayar.jail_rol`);
    if (!jail) return message.reply("Bu komutun kullanılabilmesi için Jail Rolünün tanımlanması gerekiyor! ``" + prefix[0] + "kurulum jail @jailrol`` şeklinde kurabilirsiniz")
    let boosterRol = await sunucuAyarDB.get(`sunucuayar.booster_rol`)
    if (!boosterRol) return message.reply("Bu komutun kullanılabilmesi için Booster Rolünün tanımlanması gerekiyor! ``" + prefix[0] + "kurulum booster @boosterrol`` şeklinde kurabilirsiniz")
    
    let jailLogChannel = message.guild.channels.cache.get(await rolAyarlarDB.get(`rolayarlar.jail_kanal`));
    let cezapuanLogChannel = message.guild.channels.cache.get(await rolAyarlarDB.get(`rolayarlar.ceza_puan_kanal`));
  // ihtimaller
  if (!target) return message.reply("Lütfen bir kullanıcı etiketleyiniz!")

  
  let mesajembed2 = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.ayarlar.footer).setColor("RANDOM").setTimestamp();
  if (message.member.roles.highest.position <= target.roles.highest.position) return message.channel.send(mesajembed2.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
    
  if (target.id === message.author.id) return message.reply("Bu işlemi kendi üzerinde gerçekleştiremezsin!");
  //ihtimaller bitiş
  
  let cezaID = await cezaDB.get(`cezaID`);
if (!await cezaDB.get(`cezaID`))
cezaID = await cezaDB.set(`cezaID`, 1);

let cezapuanembed = 
new MessageEmbed()
.setColor("RANDOM")
.setDescription(`${target} aldığınız #${cezaID} ID'li ceza ile **${cezaPuan}** ceza puanına ulaştınız.**`)

let uyarembed =
new MessageEmbed()
.setColor("RANDOM")
.setTimestamp()
.setFooter(client.ayarlar.footer)
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setImage("https://cdn.discordapp.com/attachments/751526628340793427/781384793207472158/bangif4.gif")
.setDescription(`**${target} Üyesi Sunucuda ${reason} Sebebiyle \n ${message.author} Tarafından Uyarıldı! Ceza Numarası:** (\`#${cezaID}\`)`)

let logembed =
new MessageEmbed()
.setColor("RANDOM")
.setTimestamp()
.setFooter(client.ayarlar.footer)
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`
• Ceza ID: \`#${cezaID}\`
• Uyarılan Üye: ${target.tag} (\`${target.id}\`)
• Yetkili: ${message.author} (\`${message.author.id}\`)
• Uyarılma Tarihi: \`${moment(Date.now()).format('LLL')}\`
• Uyarılma Sebebi: [\`${reason}\`]
`)
  
  
    if (!jailLogChannel) {
        await message.channel.send(uyarembed)
        //* DATA İŞLEMLERİ

        // CEZA SİSTEMİ
        let db = new qdb.table("cezalar");
        let data = await db.get(`cezalar`) || []
        if (data.length <= 0) data = db.set(`cezalar`, [])
        if (data.filter(x => x.Member == target.id &&  x.CezaPuan >= 250).map(x => x.CezaPuan)[0]) {
        await target.roles.set(message.members.roles.cache.get(boosterRol) ? [jail,boosterRol] : [jail])
        let uyari = await profilDB.get(`profil.${target.id}.uyari`);
        uyari.Jail = true;
        await profilDB.set(`profil.${target.id}.uyari`, uyari); // çık gir yapınca tekrar verme
        }
        // CEZA SİSTEMİ BİTİŞ

        await dataIslemler(target, message, reason, cezaDB);
        //* DATA BİTİŞ
    } else {
        await message.channel.send(uyarembed)
        await client.channels.cache.get(jailLogChannel.id).send(logembed);
        await client.channels.cache.get(cezapuanLogChannel.id).send(cezapuanembed);
        // CEZA SİSTEMİ
        let db = new qdb.table("cezalar");
        let data = await db.get(`cezalar`) || []
        if (data.length <= 0) data = db.set(`cezalar`, [])
        if (data.filter(x => x.Member == target.id &&  x.CezaPuan >= 250).map(x => x.CezaPuan)[0]) {
        await target.roles.set(message.members.roles.cache.get(boosterRol) ? [jail,boosterRol] : [jail])
        let uyari = await profilDB.get(`profil.${target.id}.uyari`);
        uyari.Jail = true;
        await profilDB.set(`profil.${target.id}.uyari`, uyari); // çık gir yapınca tekrar verme
        }
        // CEZA SİSTEMİ BİTİŞ
        
        //* DATA İŞLEMLERİ
        await dataIslemler(target, message, reason, cezaDB);
        //* DATA BİTİŞ
    }
  };
  
  exports.conf = {aliases: ["uyar", "warn", "uyari"]};
  
  exports.help = {
    name: 'uyarı',
    description: 'Etiketlenen kullanıcıya belirli miktarda jail cezası vermektedir',
    usage: 'jail @etiket <sebep>',
    kategori: 'Moderasyon'
  };
  
  async function dataIslemler(target, message, reason, cezaDB) {
    
    let cezaID = await cezaDB.get(`cezaID`);
    if (!await cezaDB.get(`cezaID`))
    cezaID = await cezaDB.set(`cezaID`, 1);
    await cezaDB.add(`cezaID`, 1);
  
    let cezaPuan = await cezaDB.get(`cezaPoint_${target.id}`);
    if (!await cezaDB.get(`cezaPoint_${target.id}`))
    cezaPuan = await cezaDB.set(`cezaPoint_${target.id}`, 10);
    await cezaDB.add(`cezaPoint_${target.id}`, 10);
  
    await cezaDB.push(`cezalar`, {
      ID: cezaID,
      CezaPuan: cezaPuan,
      Member: target.id,
      Zaman: Date.now(),
      Bitis: "Kalıcı",
      Type: "Uyarı",
      Sebep: reason,
      Yetkili: message.author.id
  });
  }
  