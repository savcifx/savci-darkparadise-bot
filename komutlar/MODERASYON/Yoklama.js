const {MessageEmbed} = require("discord.js")


exports.run = async function (client, message, args) {
  if (!message.guild) return
  if (message.member.permissions.has("ADMINISTRATOR")) {
    if (!message.guild.roles.cache.some(c => c.name == "✅ Katıldı")) {
      yoklama = await message.guild.roles.create({
        data: {
          name: "✅ Katıldı",
          permissions: 0
        },
        reason: "Canım oluşturmak istedi"
      }).then(async e => {
        message.guild.channels.cache.map(async channel => {
          let t = channel.permissionOverwrites.map(c => c);
          await channel.overwritePermissions(t, "Bir sebebim yok :(");
        })
        return e;
      });
    } else
      yoklama = message.guild.roles.cache.find((role, key) => role.name == "✅ Katıldı");
    const voiceChannel = message.member.voice.channel;
    if (voiceChannel.members.size < 1) return message.reply("Bu komut için ses kanalında en az 1 kişi olmalı.");
//
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.ayarlar.footer).setColor("RANDOM").setTimestamp();
    let members = message.guild.members.cache.filter(member => !member.voice.channel && member.roles.cache.has(yoklama.id));
    members.array().forEach((member, index) => {
      setTimeout(() => {
        member.roles.remove(yoklama).catch();
      }, index * 500)
    });
    let verildi = message.member.voice.channel.members.filter(member => member.roles.cache.has(yoklama.id) || !member.roles.cache.has(yoklama.id) && !member.user.bot)
    verildi.array().forEach((member, index) => {
      setTimeout(() => {
        member.roles.add(yoklama).catch();
      }, index * 500)
    });
    message.channel.send(embed.setDescription(`Başarılı bir şekilde \`${verildi.size} adet üyeye\` rol verildi! Toplantıya \`${members.size} adet üye katılmadı\` rol alındı!`)).catch();
//
  } else {
    return message.reply("Bu komutu kullanabilmek için Yönetici olmalısın.")
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yoklama', 'katıldı', 'yklm'],
  permLevel: 0
};

exports.help = {
  name: 'toplantı',
  description: "Toplantıya katılan üyelere Katıldı permi vermeye yarar",
  usage: 'toplantı',
  kategori: 'Sahip'
};