const {MessageEmbed} = require('discord.js');
let qdb = require("quick.db");
let sunucuayarDB = new qdb.table("sunucuayar");

exports.run = async function (client, message, args) {
  let tag = await sunucuayarDB.get(`sunucuayar.sunucu_tag`)
  let tag2 = await sunucuayarDB.get(`sunucuayar.tag2`) || tag
  let rol = await sunucuayarDB.get(`sunucuayar.booster_rol`)
  if (!message.member.roles.cache.has(rol) && !message.member.permissions.has(8)) return message.reply("Bu komutu kullanabilmek için gerekli izne sahip değilsin!")

  var isim = args.slice(0).join(" ");
  let kırmızı = " "
  if (client.ayarlar.kufurler.some(word => args.slice(0).some(c => word.toLowerCase() == c.toLowerCase()))) return message.delete({timeout: 100}), message.reply(`**${kırmızı} Engellenmiş \`Nick'ler\` ile bu komutu kullanamazsınız!**`).then(message => message.delete({timeout: 9000}));
  if(!isim) return message.reply("Yeni adını girmelisin.")
  message.member.setNickname(`${tag.replace(tag, tag2)} ${isim}`).catch(() => {})
  message.react(`${client.emojis.cache.find(x => x.name === "owsla_onay")}`)
  };
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['boostme', 'boost', 'booster', "me"],
  permLevel: 0
};

exports.help = {
  name: 'bme',
  description: "Toplantıya katılan üyelere Katıldı permi vermeye yarar",
  usage: 'toplantı',
  kategori: 'Sahip'
};