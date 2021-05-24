const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");

module.exports.run = async (client, message, args) => {
    if(!message.guild) return;

let kdb = new qdb.table("isimler");



let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM")
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) return message.channel.send(embed.setDescription("Geçmiş isimlerine bakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene !"))
let data = await kdb.get(`isimler.${member.id}`)
if (!await kdb.get(`isimler.${member.id}`)) 
data = await kdb.push(`isimler.${member.id}`, {Name: member.displayName, Role: [""]});
let listedData = data ? data.map((value, index) => `\`• ${value.Name}\` (${value.Role.map(x => `${x ? `<@&${x}>` : "Rol Belirtilmemiş"}`) || "Cinsiyet Belirtilmemiş"})`) : "Bu Üyenin İsim Geçmişi Bulunamadı.";
message.channel.send(embed.setDescription(`${member} kişisinin toplamda ${data.length} isim kayıtı bulundu. \n\n${listedData.join("\n")}`));

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isimler', 'names'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'isimler',
    description: "Etiketlenen üyeyi banlamaya yaramaktadır",
    usage: 'ban <üye> <sebep>',
    kategori: 'Moderasyon'
  };