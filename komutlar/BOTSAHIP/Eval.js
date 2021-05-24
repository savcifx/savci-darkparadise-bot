const Discord = require("discord.js");


exports.run = async (client, message, args) => {
  if (!message.guild) return
  if (client.ayarlar.yapimci.some(x => x !== message.author.id)) return

  let codein = args.slice(0).join(' ')
  if(!codein.toLowerCase().includes('token')) {
  try {
      let code = eval(codein)
      if (codein.length < 1) return message.channel.send(`:x: Bir kod girmelisin.`)
      if (typeof code !== 'string')
        code = require('util').inspect(code, { depth: 0 });

      const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .addField('Kod', `\`\`\`js\n${codein.length > 1024 ? "Karakter aşımı!" : codein}\`\`\``)
      .addField('Sonuç', `\`\`\`js\n${code.length > 1024 ? "Karakter aşımı!" : code}\n\`\`\``)
      message.channel.send({embed: embed})
  } catch(e) {
    let embed2 = new Discord.MessageEmbed()
    .setColor('RED')
    .addField('Kod', `\`\`\`js\n${codein.length > 1024 ? "Karakter aşımı!" : codein}\`\`\``)
    .addField('Hata', `\`\`\`js\n${e.length > 1024 ? "Karakter aşımı!" : e}\`\`\``)
    message.channel.send(embed2);
  }
  } else {
    message.reply('Fazla zekisin herhalde xD?')
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['eval'],
  permLevel: 4
};

exports.help = {
  name: 'eval',
  description: "Sunucuda komut denemeye yarar",
  usage: 'eval <kod>',
  kategori: "Bot Yapımcısı"
};
