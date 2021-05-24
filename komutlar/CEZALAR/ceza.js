const {MessageEmbed} = require('discord.js');
const qdb = require('quick.db');
let db = new qdb.table("cezalar");
const moment = require("moment");
moment.locale("tr")
exports.run = async (client, message, args) => {
  if (!message.guild) return
  let rolAyarlarDB = new qdb.table("rolayarlar")
  let arr = await rolAyarlarDB.get(`rolayarlar.jail_sorumlusu`) || []
  if (!message.member.permissions.has(8) && !message.member.roles.cache.some(e => arr.some(x => x == e)) && !message.members.cache.some(x => arr2.some(e => x == e))) return message.reply("Bu komutu kullanabilmek için gerekli izne sahip değilsin!")
  

  let data = await db.get(`cezalar`) || []
  if (data.length <= 0) data = db.set(`cezalar`, [])
  let target = Number(args[0])
  if (!Number(args[0])) return message.reply("Lütfen bir ceza ID'si giriniz (`.cezaID 1`)")
  let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp().setFooter(client.ayarlar.footer).setDescription(`
  ${data.length <= 0 ? "Veri Yoktur" : data.filter(x => x.ID === target).map((user, index) => `${message.guild.members.cache.get(user.Member) ? `<@${user.Member}> (<@&${message.guild.members.cache.get(user.Member).roles.highest.id}>)` : `(\`${user.Member}\`) ID'li`} kişisine uygulanan ${target} numaralı ceza bilgisi;

**Ceza Türü** 
${user.Type}

**Ceza Atan Yetkili**
<@${user.Yetkili}>

**Ceza Başlangıç**
${moment(user.Zaman).format('LLL')}

**Ceza Bitiş**
${user.Bitis == "Kalıcı" ? "Kalıcı" : moment(user.Bitis).format('LLL') }

`).join("\n")}

`)
  message.channel.send(embed)


};
exports.conf = {
  aliases: ["ceza"]
};

exports.help = {
  name: 'cezaID',
  description: "Etiketlediğiniz üyenin avatarını görüntülersiniz",
  usage: 'avatar <üye>',
  kategori: 'Genel'
};





