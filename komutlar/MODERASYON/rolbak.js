module.exports.run = async (client, message, args) => {
  if(!message.guild) return;

  if (message.member.permissions.has("ADMINISTRATOR")) {



  const Array = []
  let sayım = 0;
  let Durdur = 0
  const Role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
  if (!Role) return message.reply("Lütfen bir rol etiketleyiniz veya Rol ID'si belirtiniz")
   const filter = message.guild.members.cache.filter(User => User.roles.cache.has(Role.id))
  filter.forEach(M => {
  if (sayım === 60){
  if (Durdur > 0) return
  Durdur++;
   return Array.push("60'dan fazla üye var.")
  }
  sayım++
  Array.push(`<@${M.id}>`)
  })


  message.channel.send(`Bu rolde toplam \`${message.guild.roles.cache.get(Role.id).members.size}\` kişi bulunmaktadır\n\`\`\`` + Array.map(c => c).join(" ,")+ `\`\`\``)

} else {
  return message.reply("Yönetici yetkisine sahip olmalısın.")
}


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

  exports.help = {
    name: 'rolbak',
    description: "Etiketlediğiniz roldeki üye miktarı ve üyeleri listeleyebilirsiniz",
    usage: 'rolbak @rol',
    kategori: 'Moderasyon'
  };
