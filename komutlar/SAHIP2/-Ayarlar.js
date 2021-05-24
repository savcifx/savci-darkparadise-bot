const Discord = require('discord.js');
const Jimp = require('jimp')


const qdb = require("quick.db");


exports.run = async (client, message, args) => {
  if (!message.guild) return
let db = new qdb.table("sunucuayar");
let db3 = new qdb.table("rolayarlar");
let guvenliKisiDB = new qdb.table("guvenlikisi");

let gkv = await guvenliKisiDB.get(`guvenlikisi`) || []

if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) { 
  let sunucuayar = await db.get(`sunucuayar`)

  const acik = client.emojis.cache.find(x => x.name === "owsla_acik")
  const kapali = client.emojis.cache.find(x => x.name === "owsla_kapali")
  
  let muteSorumlusu = await db3.get(`rolayarlar.mute_sorumlusu`) || []
  let jailSorumlusu = await db3.get(`rolayarlar.jail_sorumlusu`) || []
  let banSorumlusu = await db3.get(`rolayarlar.ban_sorumlusu`) || []
  let kayıtSorumlusu = await db3.get(`rolayarlar.kayit_sorumlusu`) || []
  let genelRolSorumlusu = await db3.get(`rolayarlar.genel_rol_sorumlusu`) || []
  let kayitsizUye = await db.get(`sunucuayar.kayitsiz_uye`) || []
  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .addField(`Sunucu Ayarları:`, `${db.has(`sunucuayar.kufur_koruma`) ? `${acik} **Küfür Engel**` : `${kapali} **Küfür Engel**`}
${await db.has(`sunucuayar.reklam_koruma`) ? `${acik} **Reklam Engel**` : `${kapali} **Reklam Engel**`}
${await db.has(`sunucuayar.oto_tag`) ? `${acik} **Oto Tag** \n(${sunucuayar.oto_tag})` : `${kapali} **Oto Tag**`}
${await db.has(`sunucuayar.kayitsiz_uye`) ? `${acik} **Otorol** (${kayitsizUye.map(c => `<@&${c}>`)} <#${sunucuayar.kayit_kanal || ""}>) ` : `${kapali} **Otorol**`}
${await db3.has(`rolayarlar.ban_limit`) || db3.has(`rolayarlar.mute_limit`) || db3.has(`rolayarlar.jail_limit`) || db3.has(`rolayarlar.vmute_limit`)  ? `${acik} **Limit** \n\`Ban: ${db3.get(`rolayarlar.ban_limit`) || "Kapalı"}\` \n\`Mute: ${db3.get(`rolayarlar.mute_limit`) || "Kapalı"}\` \n\`Voice Mute: ${db3.get(`rolayarlar.vmute_limit`) || "Kapalı"}\`\n\`Jail: ${db3.get(`rolayarlar.jail_limit`) || "Kapalı"}\`` : `${kapali} **Limit**`}`, true)
    .addField(`Korumalar:`, `${db.has(`sunucuayar.bot_koruma`) ? `${acik} **Anti Raid** \n${sunucuayar.bot_koruma}` : `${kapali} **Anti Raid**`}
${await db.has(`sunucuayar.sunucu_koruma`) ? `${acik} **Sunucu Koruma** \n${sunucuayar.sunucu_koruma}` : `${kapali} **Sunucu Koruma**`}
${await db.has(`sunucuayar.kanal_koruma`) ? `${acik} **Kanal Koruma** \n${sunucuayar.kanal_koruma}` : `${kapali} **Kanal Koruma**`}
${await db.has(`sunucuayar.rol_koruma`) ? `${acik} **Rol Koruma** \n${sunucuayar.rol_koruma}` : `${kapali} **Rol Koruma**`}
${await db.has(`sunucuayar.sag_tik_koruma`) ? `${acik} **Sağ Tık Koruma** \n${sunucuayar.sag_tik_koruma}` : `${kapali} **Sağ Tık Koruma**`}
`, true)
    .addField(`Rol Sistemleri:`, `
${await db3.has(`rolayarlar.ban_sorumlusu`) ? `${acik} **Ban Sorumlusu** \n(${banSorumlusu.map(c => `<@&${c}>`)})` : `${kapali} **Ban Sorumlusu**`}
${await db3.has(`rolayarlar.mute_sorumlusu`) ? `${acik} **Mute Sorumlusu** \n(${muteSorumlusu.map(c => `<@&${c}>`)})` : `${kapali} **Mute Sorumlusu**`}
${await db3.has(`rolayarlar.jail_sorumlusu`) ? `${acik} **Jail Sorumlusu** \n(${jailSorumlusu.map(c => `<@&${c}>`)})` : `${kapali} **Jail Sorumlusu**`}
${await db3.has(`rolayarlar.kayit_sorumlusu`) ? `${acik} **Register Sorumlusu** \n(${kayıtSorumlusu.map(c => `<@&${c}>`)})` : `${kapali} **Register Sorumlusu**`}
${await db3.has(`rolayarlar.genel_rol_sorumlusu`) ? `${acik} **Ozel Rol Sorumlusu** \n(${genelRolSorumlusu.map(c => `<@&${c}>`)})` : `${kapali} **Ozel Rol Sorumlusu**`}
`, true)
    .setTimestamp()
    .setFooter(client.ayarlar.footer);

  message.channel.send({embed: embed}).then(sil => sil.delete({timeout: 60000}))
 } else {
  return message.reply(
    "Bu komut sadece TAÇ sahibi tarafından kullanılabilir"
  );
 }


  

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['settings'],
  permLevel: 0
};

exports.help = {
  name: 'ayarlar',
  description: 'Sunucunun ayarlarını görüntülemenize yaramaktadır',
  usage: 'ayarlar',
  kategori: 'Sahip 2'
};
