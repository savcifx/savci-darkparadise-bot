const {MessageEmbed} = require("discord.js")
let qdb = require("quick.db");


module.exports.run = async function(client, message, args) {
  if (!message.guild) return
  let db = new qdb.table("rolayarlar")

  let arr = await db.get(`rolayarlar.genel_rol_sorumlusu`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.ayarlar.footer).setColor("RANDOM").setTimestamp();
    if (!uye) return message.channel.send(embed.setDescription("Ses odana çekilecek üyeyi belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelID == uye.voice.channelID) return message.channel.send(embed.setDescription("Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!")).then(x => x.delete({timeout: 5000}));
    if (message.member.hasPermission("ADMINISTRATOR")) {
      await uye.voice.setChannel(message.member.voice.channelID);
      message.react("✅").catch();
    } else {
      const reactionFilter = (reaction, user) => {
        return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
      };
      message.channel.send(`${uye}`, {embed: embed.setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} seni ses kanalına çekmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
        await msj.react('✅');
        msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
          let cevap = c.first();
    if (cevap) {
      uye.voice.setChannel(message.member.voice.channelID);
            msj.delete();
            message.react("✅").catch();
    };
        });
      });
    };
    } else {
    return message.reply("Bu komutu kullanabilmek için Yönetici ya da Özel Rol Sorumlusu olmalısın")
  }


}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['çek', 'getir'],
  permLevel: 0
};

exports.help = {
  name: 'taşı',
  description: "Etiketlediğiniz kullanıcının yanınıza gelmesine yarar",
  usage: 'taşı @etiket',
  kategori: 'Moderasyon'
};
