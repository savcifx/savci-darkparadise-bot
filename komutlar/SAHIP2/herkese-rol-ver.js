const Discord = require('discord.js');

const qdb = require("quick.db");
exports.run = async (client, message, args) => {
  if (!message.guild) return;
  let guvenliKisiDB = new qdb.table("guvenlikisi");
  
  let gkv = await guvenliKisiDB.get(`guvenlikisi`) || []
  if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {
    let role = message.mentions.roles.first()
    if (!role) return message.reply("Lütfen geçerli bir rol etiketleyiniz")
    var rol = message.guild.roles.cache.get(role.id);
    if (!rol) return message.reply("Lütfen geçerli bir rol etiketleyiniz")
    message.guild.members.fetch().then(async data => {
      let members = data.map(m => m.user.id);
      var mesaj = await message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Kisuke Rol Verme`, client.user.avatarURL())
        .setDescription(`
─────────────────────
İşlem başarılı bir şekilde başladı!
─────────────────────
**Verilecek rol:** <@&${rol.id}>
**Tahmini Başarılı İşlem:** (\`${members.length}/${members.length}\`)
**Gerçekleşecek Süre:** (\`${Math.round((members.length) * (1.5) / (60))} Dakika\`)

\`Sonucu görebilmek için bu mesajı silmeyin!\`
─────────────────────
`)).then(m => m).catch(err => {
        console.log(err);
        console.log("Herkese rol verde hata var satır 30")
      });
      var indexDurumu = 0;
      setInterval(async function () {
        if (indexDurumu >= members.length) {
          mesaj.edit(
            new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Kisuke Rol Verme`, client.user.avatarURL())
            .setDescription(`

─────────────────────
İşlem başarılı bir şekilde tamamlandı.
─────────────────────
**Rol verilen üye sayısı:** (\`${members.length}\`)
**Başarılı işlem sayısı:** (\`${indexDurumu}\`)
**Gerçekleşen Süre:** (\`${Math.round((members.length) * (1.5) / (60))} Dakika\`)
─────────────────────
`)
            .setFooter(`Başarılı işlem sayısı: (${indexDurumu}/${members.length}) | Gerçekleşen Süre: (${Math.round((members.length) * (1.5) / (60))} Dakika)`)
          )
          return clearInterval(this);
        }
        var id = members[indexDurumu];
        var guildMember = await message.guild.members.cache.get(id);
        await guildMember.roles.add(rol.id);
        indexDurumu++;
      }, 1500)
    })
  } else {
    return message.reply(
      "Bu komut sadece TAÇ sahibi tarafından kullanılabilir"
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["herkese-rol-ver"],
  permLevel: 4,
};

exports.help = {
  name: 'toplu-rol-ver',
  description: 'İstediğiniz rolü sunucudaki herkese verir.',
  usage: 'toplu-rol-ver <@rol>',
  kategori: 'Sahip 2'
};