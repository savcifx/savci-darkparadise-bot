const Discord = require('discord.js');
let qdb = require("quick.db");

exports.run = async(client, message, args) => {
  if (!message.guild) return;
  let rolAyarlarDB = new qdb.table("rolayarlar");
  
    let arr = await rolAyarlarDB.get(`rolayarlar.ban_sorumlusu`) || [];
    let arr2 = await rolAyarlarDB.get(`rolayarlar.ban_users`) || ["751524861205282969"];
    if (!message.member.permissions.has(8) && !message.member.roles.cache.some(e => arr.some(x => x == e)) && !message.members.cache.some(x => arr2.some(e => e == x))) return message.reply("Bu komutu kullanabilmek için gerekli izne sahip değilsin!")
  if(!args[0]) return message.reply('Kaldırılacak banlı kullanıcının IDsini girmelisin. (Tüm banları kaldırmak için toplu yazmalısın)')
    if(args[0] === "toplu") {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu özelliği kullanabilmek için "Yönetici" iznine sahip olmalısın!')
        message.guild.fetchBans().then(bans => {
          bans.map(user => {
            message.guild.members.unban(user)
          });
        });
        message.channel.send(`**Sunucudaki banların tümü başarıyla kaldırılıyor...**`)
      return
    }
    if(isNaN(args[0])) return message.reply('Banı kaldırılacak kullanıcının ID numarasını girmelisin!').then(x => x.delete({timeout: 5000}))
    try {
      message.guild.members.unban(args[0])
      client.users.fetch(args[0]).then(x => message.channel.send(new Discord.MessageEmbed().setAuthor('Ban Kaldırıldı').setTimestamp().setColor("GREEN").setFooter(message.guild.name, message.guild.iconURL).setDescription(`**Banı Kaldırılan:** ${x.tag} \n**Banı Kaldıran:** ${message.author} | ${message.author.id}`)))
    } catch(err) {console.log(err);message.reply('Belirtilen ID numarasının banı kaldırılamadı!').then(x => x.delete({timeout: 5000})) }
};

exports.conf = {
  aliases: ['un-ban', 'ban-kaldır']
};

exports.help = {
  name: 'unban',
  description: 'Sunucudan ban kaldırmanızı sağlar.',
  usage: 'unban id/toplu',
};