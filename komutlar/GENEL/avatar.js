const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if (!message.guild) return
  
     if (message.author.bot || message.channel.type === "dm") return;  
     
let mention = message.mentions.users.first();
let sender = "";

if (message.channel.guild.member(message.author).nickname == null) {
  sender = message.author.username;
} else {
  sender = message.channel.guild.member(message.author).nickname;
}
if (mention != null || mention != undefined) {
  var name = mention.username + "'s ";
  if (mention.username.endsWith("s")) {
    name = mention.username + "' ";
  }
  const avatarEmbedOther = new Discord.MessageEmbed()
  .setColor(0x3)
  .setImage(mention.avatarURL({dynamic: true}))
  message.channel.send(avatarEmbedOther);
  return;
} else {
  const avatarEmbedYou = new Discord.MessageEmbed()
  .setColor(0x3)
  .setImage(message.author.avatarURL({dynamic: true}))
  message.channel.send(avatarEmbedYou)
  return;
}




};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['avata'],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: "Etiketlediğiniz üyenin avatarını görüntülersiniz",
  usage: 'avatar <üye>',
  kategori: 'Genel'
};
