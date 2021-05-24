const Discord = require("discord.js");
let qdb = require("quick.db");



module.exports.run = async function (client, message, args) {
  if (!message.guild) return;
  let db = new qdb.table("teyitbilgi")

  let db2 = new qdb.table("rolayarlar")
  let arr = await db2.get(`rolayarlar.genel_rol_sorumlusu`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {

    var user = message.mentions.users.first() || message.author || client.users.cache.get(args[0]);
    //////////////////////////////////////////////////////////////////////////////////////////////////

      let veri = await db.get(`teyit.${message.guild.id}.${message.author.id}`)
      if (!db.has(`teyit.${message.guild.id}.${message.author.id}`)) // Eğer veri yoksa, veritabanında yer açıyor.
        veri = await db.set(`teyit.${message.guild.id}.${message.author.id}`, {
          Erkek: 0,
          Kadin: 0
        });
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    try {
      let totalKayit = (veri.Erkek || 0) + (veri.Kadin || 0)
      let inviteee = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(user.tag, user.avatarURL())
        .setDescription(`
─────────────────────
• Toplam Kayıt: \`${totalKayit}\` (\`Erkek: ${veri.Erkek || 0} Kız: ${veri.Kadin || 0}\`)
─────────────────────
`)
        .setFooter(`${user.username} adlı üyenin bilgileri görüntüleniyor`);
      message.channel.send({
        embed: inviteee
      }).then(x => x.delete({
        timeout: 15000
      }));
    } catch (err) {
      message.channel.send("Verileriniz başarılı bir şekilde oluşturuldu lütfen komutu tekrar kullanın").then(xyz => xyz.delete({
        timeout: 10000
      }));
      return console.log(err);
    }


  } else {
    return message.reply("Bu komutu kullanabilmek için Ozel Rol Sorumlusu ya da Yönetici olmalısın.").then(xyz => xyz.delete({
      timeout: 10000
    }));
  }


};




exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['teyitbilgi'],
  permLevel: 0
};

exports.help = {
  name: 'yetkilibilgi',
  description: "Sunucuda yetkililerin kayıt istatistiklerini listeler",
  usage: 'teyit-bilgi',
  kategori: 'Moderasyon'
};