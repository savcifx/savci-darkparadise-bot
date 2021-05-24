const {MessageEmbed} = require('discord.js');
const qdb = require('quick.db');
let db = new qdb.table("cezalar");
const moment = require("moment");
const stringTable = require('string-table');
moment.locale("tr")
exports.run = async (client, message, args) => {
  if (!message.guild) return
  let rolAyarlarDB = new qdb.table("rolayarlar")
  let arr = await rolAyarlarDB.get(`rolayarlar.jail_sorumlusu`) || []
  if (!message.member.permissions.has(8) && !message.member.roles.cache.some(e => arr.some(x => x == e)) && !message.members.cache.some(x => arr2.some(e => x == e))) return message.reply("Bu komutu kullanabilmek için gerekli izne sahip değilsin!")
  

  
  let data = await db.get(`cezalar`) || []
  if (data.length <= 0) data = db.set(`cezalar`, [])

  let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  data = data.reverse();
  if (!target) return message.reply("Lütfen bir üye belirtiniz!");
  let deneme = stringTable.create(data.filter(x => x.Member == target.id).map(veri => Object.assign({ID: veri.ID, TARIH: moment(veri.Zaman).format('LLL'), TUR: veri.Type, PUAN: veri.CezaPuan, SEBEP: veri.Sebep})), { headerSeparator: '-' })
  message.channel.send(data.length <=0 ? "Datacenter'da kaydedilen bir veri görüntülenemedi" : `${target} kişisinin ceza bilgileri aşağıda belirtilmiştir. Tekli bir cezaya bakmak için \`${client.ayarlar.prefix[0]}ceza ID\` komutunu uygulayınız.`)
  message.channel.send(`${deneme}`, {split: true, code: "md"}).catch(() => {});

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: 'cezalar',
  description: "Etiketlediğiniz üyenin avatarını görüntülersiniz",
  usage: 'avatar <üye>',
  kategori: 'Genel'
};

