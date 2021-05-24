const Discord = require("discord.js");
let qdb = require("quick.db");
module.exports.run = async (client, message, args) => {
  if (!message.guild) return;
  let db = new qdb.table("rolayarlar");
  let db2 = new qdb.table("sunucuayar");
  let db3 = new qdb.table("prefix");
  let db5 = new qdb.table("teyitbilgi");
    
  let kdb = new qdb.table("isimler");

  const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
  let erkekRol = await db2.get(`sunucuayar.erkek_rol`);
  let kızRol = await db2.get(`sunucuayar.kadin_rol`);
  let supheliRol = await db2.get(`sunucuayar.supheli_rol`);
  let jailcezalıRol = await db2.get(`sunucuayar.jail_rol`);
  let kayitsizuyeRol = await db2.get(`sunucuayar.kayitsiz_uye`);
  let sunucutagi = await db2.get(`sunucuayar.sunucu_tag`);
  let sunucutagi2 = await db2.get(`sunucuayar.tag2`) || sunucutagi;
  let ekipRol = await db2.get(`sunucuayar.ekip_rol`);
  const prefix = await db3.get("prefix.") || client.ayarlar.prefix;
  let odb = new qdb.table("otokayit");
  let otokayit = await db2.get(`sunucuayar.otokayit`)

  let arr =await  db.get(`rolayarlar.kayit_sorumlusu`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
      if (!erkekRol) return message.reply(`Lütfen kayıt sistemi için erkek rolünü tanımlayınız ${prefix[0]}kurulum erkek @erkekrol`);
      if (!ekipRol) return message.reply(`Lütfen kayıt sistemi için ekip rolünü tanımlayınız ${prefix[0]}kurulum ekip @ekiprol`);
      if (!kızRol) return message.reply(`Lütfen kayıt sistemi için kız rolünü tanımlayınız ${prefix[0]}kurulum kız @kızrol`);
      if (!supheliRol) return message.reply(`Lütfen kayıt sistemi için şüpheli rolünü tanımlayınız ${prefix[0]}kurulum supheli @şüphelirol`);
      if (!jailcezalıRol) return message.reply(`Lütfen kayıt sistemi için cezalı rolünü tanımlayınız ${prefix[0]}kurulum jailcezali @cezalırol`);
      if (!kayitsizuyeRol) return message.reply(`Lütfen kayıt sistemi için kayıtsız üye rolünü tanımlayınız ${prefix[0]}kurulum kayitsizuye @kayıtsızuyerol`);
      if (!sunucutagi) return message.reply("Lütfen sunucu tagını tanımlayınız `"+ prefix+ "kurulum tag <tagını>` şeklinde kullanabilirsiniz")
      if (!user) return message.reply(`**Lütfen bir kişi etiketleyin veya ID yazınız** \`(örn: ${prefix[0]}erkek @Owsla Owsla 20)\``).then(x => x.delete({timeout: 5000}));
        let isim = String(args[1]) || user.displayName
        let yaş = Number(args[2])
        if (user.roles.cache.has(supheliRol)) {
          await user.roles.remove(supheliRol);
        } 
        if (user.roles.cache.has(jailcezalıRol)) {
          await user.roles.remove(jailcezalıRol);
        }
        if (user.user.username.includes(sunucutagi)) {
          if (client.channels.cache.get(await db2.get(`sunucuayar.sohbet_kanal`))) {
            client.channels.cache.get(await db2.get(`sunucuayar.sohbet_kanal`)).send(`${client.emojis.cache.find(x => x.name === "sag")} ${user} (\`${user.id}\`) adlı üye başarılı bir şekilde kayıt oldu! Şuan da **${message.guild.memberCount}** kişiyiz!`).then(x => x.delete({timeout: 5000}))
          }
          await kayitMesaj(message, user, db5, kdb, args);
          await (message.guild.member(user).setNickname(`${sunucutagi} ${isim.replace(sunucutagi, "")} | ${yaş}`))
          if (otokayit) {
            await odb.set(`otokayit.${user.id}`, {Tag: sunucutagi, Name: isim, Role: kızRol})
          }
          await kdb.push(`isimler.${user.id}`, {Name: isim, Role: kızRol});
          await fonksiyon(erkekRol, message, user, kızRol, kayitsizuyeRol);
          await user.roles.add(ekipRol).catch(() => { })
        } else {
          if (client.channels.cache.get(db2.get(`sunucuayar.sohbet_kanal`))) {
            client.channels.cache.get(db2.get(`sunucuayar.sohbet_kanal`)).send(`${client.emojis.cache.find(x => x.name === "sag")} ${user} (\`${user.id}\`) adlı üye başarılı bir şekilde kayıt oldu! Şuan da **${message.guild.memberCount}** kişiyiz!`).then(x => x.delete({timeout: 5000}))
          }
   
          await kayitMesaj(message, user, db5, kdb, args);
          await (message.guild.member(user).setNickname(`${sunucutagi2} ${isim.replace(sunucutagi2, "")} | ${yaş}`))
          if (otokayit) {
            await odb.set(`otokayit.${user.id}`, {Tag: sunucutagi2, Name: isim, Role: kızRol})
          }
          await kdb.push(`isimler.${user.id}`, {Name: isim, Role: kızRol});
          await fonksiyon(erkekRol, message, user, kızRol, kayitsizuyeRol);
        }
}
  else {
    return message.reply("Bu komutu kullanabilmek için Yönetici ya da Kayıt Sorumlusu olmalısın").then(xyz => xyz.delete({
      timeout: 10000
    }));
  }

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kadın', 'k', 'bayan', 'karı'],
  permLevel: 0
};

exports.help = {
  name: 'kadın',
  description: "Etiketlenen üyeye erkek rolü vermeye yarar",
  usage: 'kadın <üye>',
  kategori: 'Moderasyon'
};
async function kayitMesaj(message, user, db5, kdb, args) {
    await db5.add(`teyit.${message.guild.id}.${message.author.id}.Kadin`, 1);

    let data = await kdb.get(`isimler.${user.id}`) || []
    
    if (!await kdb.get(`isimler.${user.id}`)) 
    data = await kdb.set(`isimler.${user.id}`, []);

    
    await message.channel.send(new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
    .setDescription(`${user} **adlı üye başarılı bir şekilde kayıt oldu!**

Toplamda ${data.length || 0} isim kayıtı bulundu. \n\n${data.length >=0 ? data.map((value, index) => `\`• ${value.Name}\` (${value.Role.map(x => `${x ? `<@&${x}>` : "Rol Belirtilmemiş"}`)})`).join("\n") : "İsim Geçmişi Görüntülenemedi"}
`));
}

async function fonksiyon(erkekRol, message, user, kızRol, kayitsizuyeRol) {
  if (erkekRol) {
    erkekRol.forEach(async (RoleID) => {
      if (message.guild.roles.cache.get(RoleID)) {
        await user.roles.remove(RoleID).catch(() => { });
      }
    });
  }
  if (kızRol) {
    kızRol.forEach(async (RoleID) => {
      if (message.guild.roles.cache.get(RoleID)) {
        await user.roles.add(RoleID).catch(() => { });
      }
    });
  }
  if (kayitsizuyeRol) {
    kayitsizuyeRol.forEach(async (RoleID) => {
      if (message.guild.roles.cache.get(RoleID)) {
        await user.roles.remove(RoleID).catch(() => { });
      }
    });
  }
}

