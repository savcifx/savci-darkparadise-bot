
const Discord = require('discord.js');
const qdb = require("quick.db");



exports.run = async(client, message, args) => {
  if (!message.guild) return
  let db = new qdb.table("sunucuayar");
  let db2 = new qdb.table("prefix");
  let guvenliKisiDB = new qdb.table("guvenlikisi");
  
let gkv = await guvenliKisiDB.get(`guvenlikisi`) || []
if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) { 
  const sec = args[0]
  const prefix = db2.get(`prefix`) || client.ayarlar.prefix
  if (sec === "aç") {
	  if (await db.get(`sunucuayar.isimyas`)) {
		  return message.reply("Bu özellik zaten aktif görünüyor")
	  } else {
		  await db.set(`sunucuayar.isimyas`, "Aktif")
		  return message.reply("Başarılı bir şekilde isim-yaş sistemini aktif ettiniz!").then(x => x.delete({timeout: 15000}))
	  }
  } else if (sec === "kapat") {
	  if (!await db.get(`sunucuayar.isimyas`)) {
		  return message.reply("Bu özellik zaten de-aktif görünüyor")
	  } else {
		  await db.delete(`sunucuayar.isimyas`)
		  return message.reply("Başarılı bir şekilde isim-yaş sistemini kapattınız!").then(x => x.delete({timeout: 15000}))
	  }
  } else {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setFooter(client.ayarlar.footer)
    .setImage("https://cdn.discordapp.com/attachments/659845938407407626/708919696589586522/PLOgud8.gif")
    .setDescription(`
Sunucu da eğer isim yaş sistemi kullanıyorsanız bu özellik sizler için tasarlanmıştır Sistem kısaca sunucunuza kayıt etmek istediğiniz üyeleri ister **İsim | Yaş** şeklinde isterseniz de sadece belirlediğiniz nickname şeklinde kayıt yapabilirsiniz

Örn: \`${prefix[0]}erkek @Kisuke Kisuke 20\` şeklinde kayıt işlemi yapabilirsiniz

Doğru kullanım: \`${prefix[0]}isim-yaş-sistemi aç/kapat\` şeklinde kullanabilirsiniz
    `)
    message.channel.send({embed: embed})
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
  aliases: ["isimyaşsistemi", "isim-yaş", "isim-yaş-sistemi"],
  permLevel: 0
};

exports.help = {
  name: 'isim-yas-sistemi',
  description: 'Sunucunuzda kayıt işlemleri İsim | Yaş şeklinde ise bu sistemi açarak pratik şekilde kayıt işlemi yapabilirsiniz',
  usage: 'isim-yas-sistemi aç/kapat',
  kategori: 'Sahip 2'
};
