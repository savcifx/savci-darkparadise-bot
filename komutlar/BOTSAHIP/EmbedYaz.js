const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.guild) return
  if (client.ayarlar.yapimci.some(x => x !== message.author.id)) return
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');

  const ototagembed = new Discord.MessageEmbed()
.setColor(`RANDOM`)
.setDescription(`
${mesaj}
`)
.setTimestamp()
.setFooter(client.ayarlar.footer);

  message.delete();
  message.channel.send(ototagembed);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['embed-yaz', 'embed', 'yaz', 'ey'],
  permLevel: 4
};

exports.help = {
  name: 'yazdır',
  description: "Sunucuda embed yazmanıza yaramaktadır",
  usage: 'yazdır mesaj',
  kategori: "Bot Yapımcısı"
};
