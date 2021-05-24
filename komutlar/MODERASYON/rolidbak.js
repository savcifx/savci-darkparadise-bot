const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
if (!message.guild) return;

if (message.member.permissions.has("ADMINISTRATOR")) {
    rol = message.mentions.roles.first();
    if (!rol) return message.reply("Lütfen ID'sini öğrenmek istediğiniz rolü etiketletiniz");

    message.channel.send(`\`${rol.name}\` adlı yetkinin ID'si (\`${rol.id}\`)`)
} else {
    return message.reply("Bu komutu sadece `Yönetici` yetkisi olan kişiler kullanabilir!").then(x => x.delete({timeout: 5000}));
}




}

exports.conf = {aliases: ["rolid", "rolIDbak", "RolIDBak", "RolID", "ROLID"]};
  
  exports.help = {
    name: 'rolidbak',
    description: "Etiketlenen rolün ID'sini vermektedir",
    usage: 'rolidbak @rol',
    kategori: 'Moderasyon'
  };
  