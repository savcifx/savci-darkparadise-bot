const Discord = require('discord.js');
const client = new Discord.Client();


const moment = require("moment")
moment.locale("tr")
let qdb = require("quick.db");


exports.run = async (client, message, args) => {
  if (!message.guild) return;
  const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
  var Durum = message.author.presence.status;
  var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))));
  var durm = (Durum == "online" ? (`${client.emojis.cache.find(x => x.name === "owsla_online")} \`Çevrimiçi\``) : (Durum == "offline" ? (`${client.emojis.cache.find(x => x.name === "owsla_offline")} \`Çevrimdışı\``) : (Durum == "idle" ? (`${client.emojis.cache.find(x => x.name === "owsla_away")} \`Boşta\``) : (Durum == "dnd" ? (`${client.emojis.cache.find(x => x.name === "owsla_dnd")} \`Rahatsız Etmeyin\``) : ("Bilinmiyor/bulunamadı.")))));



  let s = message.member.roles.cache.size > 10 ? "Çok fazla olduğu için listelenemedi!" : message.member.roles.cache.map(x => x).join(', ')




  //

    const emb2 = new Discord.MessageEmbed()
      .setColor(Durm)
      .setFooter(message.guild.name, message.guild.iconURL())
      .setAuthor(client.users.cache.get(user.id).username, client.guilds.cache.get(message.guild.id).members.cache.get(user.id).user.displayAvatarURL()) // YYYYMMDD
      .setThumbnail(client.guilds.cache.get(message.guild.id).members.cache.get(user.id).user.displayAvatarURL())
      .setDescription(`
${client.users.cache.get(user.id).username} (<@${user.id}>) kişisinin bilgileri;
─────────────────────
**» Hesap Bilgileri**
• Kullanıcı ID: \`${user.id}\`
• Katılım Sıralaması: \`${(message.guild.members.cache.filter(a => a.joinedTimestamp <= message.guild.members.cache.get(user.id).joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\`
• Hesap Kuruluş Tarihi: \`${user.createdAt.toTurkishFormatDate("MM dd, yyyy | HH:mm")}\`
─────────────────────
**» Hesap Bilgileri**
• Sunucu Katılma Tarihi: \`${message.guild.member(user).joinedAt.toTurkishFormatDate("MM dd, yyyy | HH:mm")}\`
• Sunucu Takma Adı: \`${message.guild.members.cache.get(user.id).displayName.replace(`\``, "")} ${user.nickname ? "" : "[Yok]"}\`
• Durum: ${durm}
• Durum Açıklama: ${user.presence.game ? user.presence.game : "Bulunmuyor"}
• Sunucudaki Rolleri: ${s}
`)
message.channel.send({ embed: emb2 })
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bilgi', 'profil', 'istatistiklerim'],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: "Sunucu hakkında bilgileriniz listelenir",
  usage: `bilgi`,
  kategori: 'Genel'
};
function capslock() {
  return (s) => {
    let x = s.toLowerCase();
    if (typeof x !== 'string')
      return '';
    return x.charAt(0).toUpperCase() + x.slice(1);
  };
}
Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy";
  }
  format = format.replace("mm", month.toString().padStart(2, "0"));

  format = format.replace("MM", monthNames[month]);

  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  }

  format = format.replace("dd", day.toString().padStart(2, "0"));

  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) {
    format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  }

  if (format.indexOf("hh") > -1) {
    if (hours > 12) {
      hours -= 12;
    }

    if (hours === 0) {
      hours = 12;
    }
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  }

  if (format.indexOf("ii") > -1) {
    format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  }

  if (format.indexOf("ss") > -1) {
    format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  }

  return format;
};