const Discord = require('discord.js');
const qdb = require("quick.db");



exports.run = async (client, message, args) => {
  if (!message.guild) return
  let db = new qdb.table("sunucuayar");
  let db2 = new qdb.table("prefix");
  let guvenliKisiDB = new qdb.table("guvenlikisi");
  
  let gkv = await guvenliKisiDB.get(`guvenlikisi`) || []
  if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {
    const prefix = await db2.get("prefix.") || client.ayarlar.prefix
    const giris = args[0]
    const rol = await db.get(`sunucuayar.kayitsiz_uye`);
    let abc = args.slice(1).join(' ');
    if (giris === "durdur" || giris === "kapat" || giris === "sıfırla") {
      if (!rol) return message.channel.send(`Ayarlanmayan şeyi kapatamazsın!`)
      await db.delete(`sunucuayar.kayitsiz_uye`)
      message.channel.send(`Otorol özelliği başarıyla devredışı bırakıldı!`)
      return
    }

    if (!message.guild.roles.cache.get(rol)) {
      await db.delete(`sunucuayar.kayitsiz_uye`)
    }


    let kayitsizUye = await db.get(`sunucuayar.kayitsiz_uye`) || []
    if (rol) return message.channel.send(`Otorol zaten  \`${kayitsizUye.map(c => `<@&${c}>`)}\`  olarak olarak ayarlı! \n\`${prefix[0]}otorol kapat\`  yazarak şu an ayarlı olan otorolü devredışı bırakabilirsin.`)

    let roles;
    if (message.mentions.roles.size >= 1) {
      roles = message.mentions.roles.map(r => r.id);
    } else {
      if (!roles) {
        return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`
**Oto Rol Sistemi,**

Bir rol etiketlemelisin! (\`Botun yetkisi etiketlediğin rolden yukarıda olmalıdır!\`

\`Ne işe yarar?\`
Sunucuya yeni katılan üyelere belirlediğiniz rolü otomatik olarak verir.
\`${prefix[0]}otorol (@rol @rol2)\`  yazarak otorol özelliğini aktif edebilirsin.

Herkese bu rolden @bahsetme yetkisi tanı\`  özelliğini açmalısın. (Rolün ID'sini veya Adını girerek de ayarlayabilirsin.)

`))
      }
      roles = args.splice(1, 0).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
    }
    await db.set(`sunucuayar.kayitsiz_uye`, roles)

    message.channel.send(new Discord.MessageEmbed()
    .setTimestamp()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setFooter(client.user.username, client.user.avatarURL())
    .setDescription(`Otorol başarıyla  ${await db.get(`sunucuayar.kayitsiz_uye`).map(c => `<@&${c}>`)}  olarak ayarlandı!`))

  } else {
    return message.reply(
      "Bu komut sadece TAÇ sahibi tarafından kullanılabilir"
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['autorole', 'oto-rol', 'auto-role', 'otorol-ayarla'],
  permLevel: 0
};

exports.help = {
  name: 'otorol',
  description: 'Sunucuya yeni girenlere belirlediğiniz rolü otomatik olarak verir.',
  usage: 'otorol',
  kategori: 'Sahip'
};