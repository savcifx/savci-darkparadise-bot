const Discord = require('discord.js');

let qdb = require("quick.db");



exports.run = async (client, message, args) => {
  if (!message.guild) return
  let db = new qdb.table("rolayarlar");
  let db2 = new qdb.table("sunucuayar");
  let db4 = new qdb.table("prefix");
  
  let arr = db.get(`rolayarlar.kayit_sorumlusu`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {


    const prefix = await db4.get(`prefix`) || client.ayarlar.prefix
    const tagyok = ""
    const tagyok2 = ""
    const sunucutagi = await db2.get(`sunucuayar.sunucu_tag`) || tagyok
    const sunucutagi2 = await db2.get(`sunucuayar.tag2`) || tagyok2

    //ikili tag sistemi
    if (await db2.get(`sunucuayar.tag2`)) {

      if (await db2.get(`sunucuayar.isimyas`)) {
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
        if (!user) return message.reply(`**Lütfen bir kişi etiketleyin veya ID yazınız** \`(örn: ${prefix[0]}isim @Etiket/ID İsim | Yaş)\``).then(x => x.delete({
          timeout: 5000
        }))
        let nick = args[1]
        let nick2 = args[2]
        if (!nick) return message.reply(`**Lütfen bir isim yazınız** \`(örn: ${prefix[0]}isim @Etiket/ID İsim | Yaş)\``).then(x => x.delete({
          timeout: 5000
        }))
        if (!nick2) return message.reply(`**Lütfen bir yaş yazınız** \`(örn: ${prefix[0]}isim @Etiket/ID İsim | Yaş)\``).then(x => x.delete({
          timeout: 5000
        }))


        if (user.user.username.includes(sunucutagi)) {
          await (message.guild.member(user).setNickname(`${sunucutagi} ${nick} | ${nick2}`))
        } else {
          await (message.guild.member(user).setNickname(`${sunucutagi2} ${nick} | ${nick2}`))
        }
        await message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${message.author.tag}`, message.author.avatarURL())
          .setDescription(`${user} üyesinin ismi başarıyla değiştirildi`)).then(x => x.delete({
          timeout: 10000
        }))
      } else {

        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
        if (!user) return message.reply(`**Lütfen bir kişi etiketleyin veya ID yazınız** \`(örn: ${prefix[0]}isim @Etiket/ID İsim)\``).then(x => x.delete({
          timeout: 5000
        }))
        let nick = args.slice(1).join(' ')
        if (!nick) return message.reply(`**Lütfen bir isim yazınız** \`(örn: ${prefix[0]}isim @Etiket/ID İsim)\``).then(x => x.delete({
          timeout: 5000
        }))


        
        if (user.user.username.includes(sunucutagi)) {
          await (message.guild.member(user).setNickname(`${sunucutagi} ${nick}`))
        } else {
          await (message.guild.member(user).setNickname(`${sunucutagi2} ${nick}`))
        }

        await message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${message.author.tag}`, message.author.avatarURL())
          .setDescription(`${user} üyesinin ismi başarıyla değiştirildi`)).then(x => x.delete({
          timeout: 10000
        }))



      }

    } /* ikili tag bitiş */
    else {

      if (await db2.get(`sunucuayar.isimyas`)) {
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
        if (!user) return message.reply(`**Lütfen bir kişi etiketleyin veya ID yazınız** \`(örn: ${prefix[0]}isim @Etiket/ID İsim | Yaş)\``).then(x => x.delete({
          timeout: 5000
        }))
        let nick = args[1]
        let nick2 = args[2]
        if (!nick) return message.reply(`**Lütfen bir isim yazınız** \`(örn: ${prefix[0]}isim @Etiket/ID İsim | Yaş)\``).then(x => x.delete({
          timeout: 5000
        }))
        if (!nick2) return message.reply(`**Lütfen bir yaş yazınız** \`(örn: ${prefix[0]}isim @Etiket/ID İsim | Yaş)\``).then(x => x.delete({
          timeout: 5000
        }))
        await (message.guild.member(user).setNickname(`${sunucutagi} ${nick} | ${nick2}`))

        await message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${message.author.tag}`, message.author.avatarURL())
          .setDescription(`${user} üyesinin ismi başarıyla değiştirildi`)).then(x => x.delete({
          timeout: 10000
        }))
      } else {

        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
        if (!user) return message.reply(`**Lütfen bir kişi etiketleyin veya ID yazınız** \`(örn: ${prefix[0]}isim @Etiket/ID İsim)\``).then(x => x.delete({
          timeout: 5000
        }))
        let nick = args.slice(1).join(' ')
        if (!nick) return message.reply(`**Lütfen bir isim yazınız** \`(örn: ${prefix[0]}isim @Etiket/ID İsim)\``).then(x => x.delete({
          timeout: 5000
        }))


        
        await (message.guild.member(user).setNickname(`${sunucutagi} ${nick}`))
        await message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${message.author.tag}`, message.author.avatarURL())
          .setDescription(`${user} üyesinin ismi başarıyla değiştirildi`)).then(x => x.delete({
          timeout: 10000
        }))



      }
    }






  } else {
    return message.reply("Bu komutu kullanabilmek için Yönetici ya da Kayıt Sorumlusu olmalısın").then(xyz => xyz.delete({
      timeout: 10000
    }));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['nick', 'isim', 'i', 'n'],
  permLevel: 0
};

exports.help = {
  name: 'isim',
  description: "Etiketlenen üyenin adını değiştirmeye yarar",
  usage: 'isim <etiket> <isim>',
  kategori: 'Moderasyon'
};
