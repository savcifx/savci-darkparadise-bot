const {
  MessageEmbed
} = require('discord.js');
const qdb = require("quick.db");
const ms = require("ms");
const moment = require("moment");


exports.run = async (client, message, args) => {
  if (!message.guild) return
  let db = new qdb.table("yetki_sistem");
  let sec = args[0]
  let data = await db.get("yetkili_al.")
  let veri = await db.get(`yetkili_sistemi`)
  
  let target = message.mentions.members.first() || message.guild.members.cache.get(args[2]);
  if (data ? message.member.roles.cache.get(data.filter(x => message.member.roles.cache.map(y => y == x.YetkiliRol)).map(x => x.YetkiliRol)[0]) : message.member.permissions.has(8) || message.member.permissions.has(8) || message.guild.members.cache.some(x => client.ayarlar.yapimci.some(y => y == x.id))) {

    if (!sec) {
      return mesaj(data, message, client);
    }
    if (sec == "ayarla") {
      if (message.guild.members.cache.some(x => client.ayarlar.yapimci.some(y => y == x.id)) || message.author.id === message.guild.owner.id) {
        let sec2 = args[1]
        let sec3 = args[2]
        if ((await db.get(`yetkili_al.`) && await db.get(`yetkili_al.`).find(x => x.YetkiAdi === args[1]))) return message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
        if (sec2) {
          if (sec3) {
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
                .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}yetki ayarla @rol1 @rol2 @rol3\`\`\``, true)
                .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
                .addField(`:grey_exclamation: Örnek`, `\`\`\`${prefix[0]}yetki ayarla ID1 ID2 ID3\`\`\``, true)
                .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL({
                  dynamic: true
                })));

            if (roles.length > 7)
              return await message.channel.send(new MessageEmbed()
                .setColor("#FF6553")
                .setTitle(":x: Komutu Yanlış Kullandın! :x:")
                .setDescription("Susturma rolü olarak sadece `5` tane rol belirlenebilir. Sen ise " + roles.length + " kadar rol eklemeye çalıştın.")
                .setThumbnail("https://cdn.discordapp.com/attachments/698398041518112898/699064766626267188/giphy.gif")
                .setFooter(message.author.username + " Tarafından kullanıldı.", message.author.avatarURL()))


            await db.push(`yetkili_al.`, { YetkiAdi: sec2, Roller: roles, YetkiliRol: sec3 });
            message.react(`${client.emojis.cache.find(x => x.name === "owsla_onay")}`);
          } else return message.reply("**Doğru Kullanım:** `!yetki ayarla yetkiAdı <YetkiliRolID> @VerilecekRol @VerilecekRol2`"), message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);

        } else return message.reply("**Doğru Kullanım:** `!yetki ayarla yetkiAdı <YetkiliRolID> @VerilecekRol @VerilecekRol2`"), message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
      }
      else return message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
    }
    if (sec == "sil") {
      if (message.guild.members.cache.some(x => client.ayarlar.yapimci.some(y => y == x.id)) || message.author.id === message.guild.owner.id) {
        let sec2 = args[1]
        if (sec2) {
            let silarr = data.filter(x => x.YetkiAdi !== sec2).map(x => x)
            removeItemOnce(silarr, sec2)
            await db.set(`yetkili_al.`, silarr);
            message.react(`${client.emojis.cache.find(x => x.name === "owsla_onay")}`);
        } else return message.reply("**Doğru Kullanım:** `!yetki sil yetkiAdı`"), message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
      }
      else return message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
    }


    if (sec == "bilgi") {
      if (veri.filter(bilgi => bilgi.Yetkili === target.id)[0]) {
        return message.channel.send(new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(client.users.cache.get(target.id).username, client.guilds.cache.get(message.guild.id).members.cache.get(target.id).user.displayAvatarURL({dynamic: true})) // YYYYMMDD
        .setFooter(client.ayarlar.footer).setDescription(`
**Toplam Aldığı Yetkili Sayısı:** \`${veri ? veri.length : 0} kişi\`\n
${target} (<@&${target.roles.highest.id}>) **adlı üyenin aldığı yetkililer**\n
${veri ? veri.map(kmt => `**Yetki:** \`${kmt.RolAd}\` **Verilen Üye:** <@${kmt.VerilenUye}>`).join('\n') : "```Datacenter'da kaydedilen bir veri görüntülenemedi```"}
`))
      } else return message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
    }

    if (sec == "ver") {
      if (!target) return mesaj(data, message, client);
      if (data.map(x => x.YetkiAdi).some(i => i.includes(args[1].toLowerCase()))) {
        if (message.member.roles.cache.get(data.filter(x => message.member.roles.cache.map(y => y == x.YetkiliRol)).map(x => x.YetkiliRol)[0]) || message.member.permissions.has(8)) {
          
          if (veri ? veri.filter(x => target.id == x.VerilenUye).map(x => x.VerilenUye)[0] : message.author.id === target.id) return message.reply("Zaten yetki verilen birisine tekrardan yetki veremezsin!")
          await db.push(`yetkili_sistemi`, { Yetkili: message.author.id, VerilenRoller: data.filter(x => x.YetkiAdi == args[1]).map(x => x.Roller)[0], RolAd: data.filter(x => x.YetkiAdi == args[1]).map(x => x.YetkiAdi)[0], VerilenUye: target.id })
          
          target.roles.add(data.filter(x => x.YetkiAdi == args[1]).map(x => x.Roller)[0]).catch(() => {})
          return message.react(`${client.emojis.cache.find(x => x.name === "owsla_onay")}`)
        }
        return message.reply("Bu komut için gerekli izine sahip değilsin"), message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
      } return mesaj(data, message, client); 
    }


    if (sec == "al") {
      if (message.member.roles.cache.get(data.filter(x => message.member.roles.cache.map(y => y == x.YetkiliRol)).map(x => x.YetkiliRol)[0]) || message.member.permissions.has(8)) {
        if (!target) return message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
        let komut = args.slice(1).join(' ');
        if (veri.filter(bilgi => bilgi.Yetkili === message.author.id).map(x => x.Yetkili)[0] || message.author.id === message.guild.owner.id || message.member.permissions.has(8)) {
         if (data.map(x => x.YetkiAdi).some(i => i.includes(args[1].toLowerCase()))) {
        target.roles.remove(data.filter(x => x.YetkiAdi == args[1]).map(x => x.Roller)[0]);
        let arr = veri.filter(x => x.VerilenUye != target.id).map(x => x)
        removeItemOnce(arr, komut)
        await db.set(`yetkili_sistemi`, arr);
        message.channel.send("Başarılı bir şekilde <@!" + target + "> adlı üyenin yetkilerini aldın!")
      } else return message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);         
        
    } else return message.channel.send(`${message.author}, Etiketlediğin kullanıcı <@${veri.filter(bilgi => bilgi.Yetkili).map(x => x.Yetkili)[0]}> tarafından görevlendirilmiş sadece o ve kurucular yetkisini alabilir!`);

    } else return message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
  }


  } else {
    return message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
  }




};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yetki',
  description: 'Etiketlenen kullanıcıya belirli miktarda mute cezası vermektedir',
  usage: 'unsesmute [etiket]',
  kategori: 'Moderasyon'
};
function removeItemOnce(arr, value) { var index = arr.indexOf(value); if (index > -1) { arr.splice(index, 1); } return arr; }

function mesaj(data, message, client) {
  let komutlar = data ? data.map(kmt => `\`${kmt.YetkiAdi}\` (${kmt.Roller.map(x => `<@&${x}>`)})`).join('\n') : "```Datacenter'da kaydedilen bir veri görüntülenemedi```";

  let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag).setDescription(`
**Lütfen vermek istediğiniz yetkiyi aşağıdaki gibi seçiniz.**

${komutlar}

Örnek kullanım:
\`${client.ayarlar.prefix[0]} yetki ver yetkiAdı @Owsla#0001\`
\`${client.ayarlar.prefix[0]} yetki al @Owsla#0001\`
${message.author.id == message.guild.owner.id || message.guild.members.cache.some(x => client.ayarlar.yapimci.some(y => y == x.id)) ? `
\`${client.ayarlar.prefix[0]} yetki ayarla yetkiAdı <YetkiliRolID> @VerilecekRol @VerilecekRol2\`
\`${client.ayarlar.prefix[0]} yetki sil yetkiAdı\`
\`${client.ayarlar.prefix[0]} yetki bilgi @Owsla#0001\``: ""}
`);
  return message.channel.send(embed);
}

