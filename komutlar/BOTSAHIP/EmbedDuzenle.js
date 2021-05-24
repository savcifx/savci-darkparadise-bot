const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.guild) return
  if (client.ayarlar.yapimci.some(x => x !== message.author.id)) return
 
  var id = args[0];
  var gucuales = args.slice(1).join(' ');

  if (!id || isNaN(id) || !gucuales || !message.channel.getMessage(id) || gucuales.length > 2000) return message.reply(`Komutu, düzenlenecek mesajın kanalında doğru bir şekilde kullanmalısın!\n**Doğru Kullanım:** ${prefix[0]}${this.help.name} mesajID yeniMesaj`).then(a => a.delete({timeout: 10000}));
  message.channel
  .getMessage(id)
  .then(mesaj => mesaj.edit(new Discord.MessageEmbed()
  .setTimestamp()
  .setFooter(client.ayarlar.footer)
  .setDescription(gucuales))
  .catch(message.reply('Mesaj başarıyla düzenlendi')));
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['embed-duzenle'],
  permLevel: 4
};

exports.help = {
  name: 'yaz-duzenle',
  description: "Sunucuda yazdığınız embedi düzenlemenize yarar",
  usage: 'yaz-duzenle <mesajid> mesaj',
  kategori: "Bot Yapımcısı"
};
