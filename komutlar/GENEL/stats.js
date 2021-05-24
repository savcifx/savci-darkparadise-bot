const Discord = require('discord.js');
const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");
let qdb = require("quick.db");
let db = new qdb.table("stats");
let sunucuayarDB = new qdb.table("sunucuayar")
let stats_week = new qdb.table("stats_week")
let stats_daily = new qdb.table("stats_daily")
let stats_two_week = new qdb.table("stats_two_week")
let stats_three_week = new qdb.table("stats_three_week")
let stats_month = new qdb.table("stats_month")

let mstats_week = new qdb.table("mstats_week")
let mstats_daily = new qdb.table("mstats_daily")
let mstats_two_week = new qdb.table("mstats_two_week")
let mstats_three_week = new qdb.table("mstats_three_week")
let mstats_month = new qdb.table("mstats_month")

exports.run = async (client, message, args) => {
    if (!message.guild) return;
    
    var user = message.mentions.members.first() || message.guild.members.cache.get(args[2]) || message.guild.members.cache.get(message.author.id);
    // KANAL BİLGİLERİ //
    // GENEL
    let voiceData = await db.get(`stats.${message.guild.id}.${user.id}`) || {voice: 0, channels: {}};
    let categoryData = await db.get(`stats.${message.guild.id}.${user.id}`) || {voice: 0, category: {}};
    let sleep_room = await db.get(`sleep_room.${message.guild.id}.${user.id}.${await sunucuayarDB.get(`sunucuayar.sleep_kanal`)}`)
    let messageData = await db.get(`message.${message.guild.id}.${user.id}`) || {messages: 0, channels: {}};
    // 1 GÜNLÜK 
    let voiceData_daily = await stats_daily.get(`stats_daily.${message.guild.id}.${user.id}`) || {voice: 0, channels: {}};
    let categoryData_daily = await stats_daily.get(`stats_daily.${message.guild.id}.${user.id}`) || {voice: 0, channels: {}};
    let messageData_daily = await mstats_daily.get(`message_daily.${message.guild.id}.${user.id}`) || {messages: 0, channels: {}};
    // 1 HAFTALIK
    let voiceData_week = await stats_week.get(`stats_week.${message.guild.id}.${user.id}`) || {voice: 0, channels: {}};
    let categoryData_week = await stats_week.get(`stats_week.${message.guild.id}.${user.id}`) || {voice: 0, category: {}};
    let messageData_week = await mstats_week.get(`message_week.${message.guild.id}.${user.id}`) || {messages: 0, channels: {}};
    // 2 HAFTALIK
    let voiceData_two_week = await stats_two_week.get(`stats_two_week.${message.guild.id}.${user.id}`) || {voice: 0, channels: {}};
    let categoryData_two_week = await stats_two_week.get(`stats_two_week.${message.guild.id}.${user.id}`) || {voice: 0, category: {}};
    let messageData_two_week = await mstats_two_week.get(`message_two_week.${message.guild.id}.${user.id}`) || {messages: 0, channels: {}};
    // 3 HAFTALIK
    let voiceData_three_week = await stats_three_week.get(`stats_three_week.${message.guild.id}.${user.id}`) || {voice: 0, channels: {}};
    let categoryData_three_week = await stats_three_week.get(`stats_three_week.${message.guild.id}.${user.id}`) || {voice: 0, category: {}};
    let messageData_three_week = await mstats_three_week.get(`message_three_week.${message.guild.id}.${user.id}`) || {messages: 0, channels: {}};
    // 1 AYLIK
    let voiceData_month = await stats_month.get(`stats_month.${message.guild.id}.${user.id}`) || {voice: 0, channels: {}};
    let categoryData_month = await stats_month.get(`stats_month.${message.guild.id}.${user.id}`) || {voice: 0, category: {}};
    let messageData_month = await mstats_month.get(`message_month.${message.guild.id}.${user.id}`) || {messages: 0, channels: {}};

// GENEL
let { toplam_sure, toplam_mesaj, category, voiceList, messageList } = await fonksiyon(voiceData, categoryData, messageData, client);
// 1 Günlük
let { category_daily, toplam_sure_daily, voiceList_daily, toplam_mesaj_daily, messageList_daily } = await fonksiyon3(voiceData_daily, categoryData_daily, messageData_daily, client);
// 1 HAFTALK
let { category_week, toplam_sure_week, voiceList_week, toplam_mesaj_week, messageList_week } = await fonksiyon2(voiceData_week, categoryData_week, messageData_week, client);
//2 HAFTALIK
let { category_two_week, toplam_sure_two_week, voiceList_two_week, toplam_mesaj_two_week, messageList_two_week } = await fonksiyon4(voiceData_two_week, categoryData_two_week, messageData_two_week, client);
// 3 HAFTALIK
let { category_three_week, toplam_sure_three_week, voiceList_three_week, toplam_mesaj_three_week, messageList_three_week } = await fonksiyon5(voiceData_three_week, categoryData_three_week, messageData_three_week, client);
// 1 AYLIK
let { category_month, toplam_sure_month, voiceList_month, toplam_mesaj_month, messageList_month } = await fonksiyon6(voiceData_month, categoryData_month, messageData_month, client);

    let embed2 = new Discord.MessageEmbed().setColor("RANDOM")
    .setColor("RANDOM")
    .setFooter(message.guild.name, message.guild.iconURL())
    .setThumbnail(client.guilds.cache.get(message.guild.id).members.cache.get(user.id).user.displayAvatarURL({dynamic: true}))
    .setAuthor(client.users.cache.get(user.id).username, client.guilds.cache.get(message.guild.id).members.cache.get(user.id).user.displayAvatarURL({dynamic: true}))
    if (args[0] === "1") {
return message.channel.send(embed2.setDescription(`
${user} (<@&${user.roles.highest.id}>) istatistikleri

**Toplam Kategori Bilgileri**
${category ? `\`0.\` Toplam: \`${moment.duration(toplam_sure).format("H [saat,] m [dakika,] s [saniye]")}\`\n${category}\n\`11.\` Sleeping Room: \`${moment.duration(sleep_room).format("H [saat,] m [dakika,] s [saniye]")}\`` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Toplam Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData.channels).length)} kanalda durmuş\`)
${voiceList ? `${voiceList}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Toplam Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj} mesaj\`)
${messageList ? messageList : `Datacenter'da kaydedilen bir veri görüntülenemedi`}
`))
} else if (args[0] === "2") {
return message.channel.send(embed2.setDescription(`
${user} (<@&${user.roles.highest.id}>) istatistikleri

**Günlük Kategori Bilgileri**
${category_daily ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_daily).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Günlük Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_daily.channels).length)} kanalda durmuş\`)
${voiceList_daily ? `${voiceList_daily}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Günlük Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_daily} mesaj\`)
${messageList_daily ? messageList_daily : `Datacenter'da kaydedilen bir veri görüntülenemedi`}`))
} else if (args[0] === "3") {
return message.channel.send(embed2.setDescription(`
${user} (<@&${user.roles.highest.id}>) istatistikleri

**Haftalık Kategori Bilgileri**
${category_week ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_week).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Haftalık Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_week.channels).length)} kanalda durmuş\`)
${voiceList_week ? `${voiceList_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Haftalık Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_week} mesaj\`)
${messageList_week ? messageList_week : `Datacenter'da kaydedilen bir veri görüntülenemedi`}
`))
} else if (args[0] === "4") {
return message.channel.send(embed2.setDescription(`
${user} (<@&${user.roles.highest.id}>) istatistikleri

**2 Haftalık Kategori Bilgileri**
${category_two_week ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_two_week).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**2 Haftalık Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_two_week.channels).length)} kanalda durmuş\`)
${voiceList_two_week ? `${voiceList_two_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**2 Haftalık Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_two_week} mesaj\`)
${messageList_two_week ? messageList_two_week : `Datacenter'da kaydedilen bir veri görüntülenemedi`}`))
} else if(args[0] === "5") {
return message.channel.send(embed2.setDescription(`
${user} (<@&${user.roles.highest.id}>) istatistikleri

**3 Haftalık Kategori Bilgileri**
${category_three_week ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_three_week).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**3 Haftalık Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_three_week.channels).length)} kanalda durmuş\`)
${voiceList_three_week ? `${voiceList_three_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**3 Haftalık Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_three_week} mesaj\`)
${messageList_three_week ? messageList_three_week : `Datacenter'da kaydedilen bir veri görüntülenemedi`}`))
} else if (args[0] === "6") {
return message.channel.send(embed2.setDescription(`
${user} (<@&${user.roles.highest.id}>) istatistikleri

**Aylık Kategori Bilgileri**
${category_month ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_month).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Aylık Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_month.channels).length)} kanalda durmuş\`)
${voiceList_month ? `${voiceList_month}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Aylık Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_month} mesaj\`)
${messageList_month ? messageList_month : `Datacenter'da kaydedilen bir veri görüntülenemedi`}`))
} else {

// Require json file.

const emojis = [`
${user} (<@&${user.roles.highest.id}>) istatistikleri

Lütfen 1 adet kategori seçin.
\`\`\`
1 -) Toplam İstatistik
2 -) Günlük İstatistik
3 -) 1 Haftalık İstatistik
4 -) 2 Haftalık İstatistik
5 -) 3 Haftalık İstatistik
6 -) 1 Aylık İstatistik\`\`\`
\`\`\`
Örnek Kullanım:
.stats 1 | .stats 2 | .stats 3
\`\`\`

**Komut yazmak istemiyorsanız tepkilere tıklayınız**
`, `
${user} (<@&${user.roles.highest.id}>) istatistikleri

**Toplam Kategori Bilgileri**
${category ? `\`0.\` Toplam: \`${moment.duration(toplam_sure).format("H [saat,] m [dakika,] s [saniye]")}\`\n${category}\n\`11.\` Sleeping Room: \`${moment.duration(sleep_room).format("H [saat,] m [dakika,] s [saniye]")}\`` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Toplam Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData.channels).length)} kanalda durmuş\`)
${voiceList ? `${voiceList}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Toplam Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj} mesaj\`)
${messageList ? messageList : `Datacenter'da kaydedilen bir veri görüntülenemedi`}
`,
//////////////
`
${user} (<@&${user.roles.highest.id}>) istatistikleri

**Günlük Kategori Bilgileri**
${category_daily ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_daily).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Günlük Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_daily.channels).length)} kanalda durmuş\`)
${voiceList_daily ? `${voiceList_daily}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Günlük Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_daily} mesaj\`)
${messageList_daily ? messageList_daily : `Datacenter'da kaydedilen bir veri görüntülenemedi`}`,
//////////////
`
${user} (<@&${user.roles.highest.id}>) istatistikleri

**Haftalık Kategori Bilgileri**
${category_week ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_week).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Haftalık Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_week.channels).length)} kanalda durmuş\`)
${voiceList_week ? `${voiceList_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Haftalık Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_week} mesaj\`)
${messageList_week ? messageList_week : `Datacenter'da kaydedilen bir veri görüntülenemedi`}`,
//////////////
`
${user} (<@&${user.roles.highest.id}>) istatistikleri

**2 Haftalık Kategori Bilgileri**
${category_two_week ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_two_week).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**2 Haftalık Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_two_week.channels).length)} kanalda durmuş\`)
${voiceList_two_week ? `${voiceList_two_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**2 Haftalık Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_two_week} mesaj\`)
${messageList_two_week ? messageList_two_week : `Datacenter'da kaydedilen bir veri görüntülenemedi`}
`,
//////////////
`
${user} (<@&${user.roles.highest.id}>) istatistikleri

**3 Haftalık Kategori Bilgileri**
${category_three_week ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_three_week).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**3 Haftalık Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_three_week.channels).length)} kanalda durmuş\`)
${voiceList_three_week ? `${voiceList_three_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**3 Haftalık Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_three_week} mesaj\`)
${messageList_three_week ? messageList_three_week : `Datacenter'da kaydedilen bir veri görüntülenemedi`}
`,
//////////////
`
${user} (<@&${user.roles.highest.id}>) istatistikleri

**Aylık Kategori Bilgileri**
${category_month ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_month).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Aylık Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_month.channels).length)} kanalda durmuş\`)
${voiceList_month ? `${voiceList_month}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Aylık Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_month} mesaj\`)
${messageList_month ? messageList_month : `Datacenter'da kaydedilen bir veri görüntülenemedi`}`
]

// Define our function.
async function list(listMsg, page, increment) {
  const entries = Object.entries(emojis);

  // Set up base embed.
  var embed = new Discord.MessageEmbed()
    .setColor(1056085)
    .setTitle('**Günlük / Haftalık / Aylık Stats Bilgileri**')
    .setFooter(`Page ${page} of ${Math.ceil(entries.length/increment)}`)
    .setTimestamp(listMsg ? listMsg.createdAt : undefined);

  // Add fields to embed.

  const stringField = [];

  for (let [emoji, string] of entries.slice((page - 1) * increment, (page * increment))) {

    stringField.push(string);
  }

  embed.setDescription(stringField.join('\n'), true);

  // Edit/send embed.
  if (listMsg) await listMsg.edit(embed);
  else listMsg = await message.channel.send(embed);

  // Set up page reactions.
  const lFilter = (reaction, user) => reaction.emoji.name === '◀' && page !== 1 && user.id === message.author.id;
  const lCollector = listMsg.createReactionCollector(lFilter, { max: 1 });

  lCollector.on('collect', async () => {
    rCollector.stop();
    await listMsg.reactions.removeAll();
    list(listMsg, page - 1, increment);
  });

  const rFilter = (reaction, user) => reaction.emoji.name === '▶' && entries.length > page * increment && user.id === message.author.id;
  const rCollector = listMsg.createReactionCollector(rFilter, { max: 1 });

  rCollector.on('collect', async () => {
    lCollector.stop();
    await listMsg.reactions.removeAll();
    list(listMsg, page + 1, increment);
  });

  if (page !== 1) await listMsg.react('◀');
  if (entries.length > page * increment) await listMsg.react('▶');
}

// Send the list; page 1, and 5 shown on each page.
list(undefined, 1, 1)
  .catch(console.error);
}









  }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["istatistik", "stat"],
    permLevel: 0
};

exports.help = {
    name: 'stats',
    description: "Ses/Mesaj kanallarındaki istatistiklerinizi listeler",
    usage: `stats`,
    kategori: 'Genel'
};

async function fonksiyon6(voiceData_month, categoryData_month, messageData_month, client) {
  let toplam_sure_month = 0;
  let voiceList_month = Object.keys(voiceData_month.channels || {}).map(vd => {
    toplam_sure_month += voiceData_month.channels[vd];
    return {
      Id: vd,
      Total: voiceData_month.channels[vd]
    };

  }).sort((a, b) => b.Total - a.Total);

  let category_month = Object.keys(categoryData_month.category || {}).map(vc => {

    return {
      Id: vc,
      Total: categoryData_month.category[vc]
    };
  }).sort((a, b) => b.Total - a.Total);
  let toplam_mesaj_month = 0;
  let messageList_month = Object.keys(messageData_month.channels).map(md => {
    toplam_mesaj_month += messageData_month.channels[md];
    return {
      Id: md,
      Total: messageData_month.channels[md]
    };
  }).sort((a, b) => b.Total - a.Total);

  voiceList_month = voiceList_month.length > 10 ? voiceList_month.splice(0, 10) : voiceList_month;
  voiceList_month = voiceList_month.map((vd, index) => `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");
  category_month = category_month.length > 10 ? category_month.splice(0, 10) : category_month;
  category_month = category_month.map((vc, index) => `\`${index + 1}.\` ${client.channels.cache.has(vc.Id) ? client.channels.cache.get(vc.Id).name.toString() : "#deleted-channel"}: \`${moment.duration(vc.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");

  messageList_month = messageList_month.length > 10 ? messageList_month.splice(0, 10) : messageList_month;
  messageList_month = messageList_month.map((md, index) => `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");
  return { category_month, toplam_sure_month, voiceList_month, toplam_mesaj_month, messageList_month };
}

async function fonksiyon5(voiceData_three_week, categoryData_three_week, messageData_three_week, client) {
  let toplam_sure_three_week = 0;
  let voiceList_three_week = Object.keys(voiceData_three_week.channels || {}).map(vd => {
    toplam_sure_three_week += voiceData_three_week.channels[vd];
    return {
      Id: vd,
      Total: voiceData_three_week.channels[vd]
    };

  }).sort((a, b) => b.Total - a.Total);

  let category_three_week = Object.keys(categoryData_three_week.category || {}).map(vc => {

    return {
      Id: vc,
      Total: categoryData_three_week.category[vc]
    };
  }).sort((a, b) => b.Total - a.Total);
  let toplam_mesaj_three_week = 0;
  let messageList_three_week = Object.keys(messageData_three_week.channels).map(md => {
    toplam_mesaj_three_week += messageData_three_week.channels[md];
    return {
      Id: md,
      Total: messageData_three_week.channels[md]
    };
  }).sort((a, b) => b.Total - a.Total);

  voiceList_three_week = voiceList_three_week.length > 10 ? voiceList_three_week.splice(0, 10) : voiceList_three_week;
  voiceList_three_week = voiceList_three_week.map((vd, index) => `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");
  category_three_week = category_three_week.length > 10 ? category_three_week.splice(0, 10) : category_three_week;
  category_three_week = category_three_week.map((vc, index) => `\`${index + 1}.\` ${client.channels.cache.has(vc.Id) ? client.channels.cache.get(vc.Id).name.toString() : "#deleted-channel"}: \`${moment.duration(vc.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");

  messageList_three_week = messageList_three_week.length > 10 ? messageList_three_week.splice(0, 10) : messageList_three_week;
  messageList_three_week = messageList_three_week.map((md, index) => `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");
  
  return { category_three_week, toplam_sure_three_week, voiceList_three_week, toplam_mesaj_three_week, messageList_three_week };
}

async function fonksiyon4(voiceData_two_week, categoryData_two_week, messageData_two_week, client) {
  let toplam_sure_two_week = 0;
  let voiceList_two_week = Object.keys(voiceData_two_week.channels || {}).map(vd => {
    toplam_sure_two_week += voiceData_two_week.channels[vd];
    return {
      Id: vd,
      Total: voiceData_two_week.channels[vd]
    };

  }).sort((a, b) => b.Total - a.Total);

  let category_two_week = Object.keys(categoryData_two_week.category || {}).map(vc => {

    return {
      Id: vc,
      Total: categoryData_two_week.category[vc]
    };
  }).sort((a, b) => b.Total - a.Total);
  let toplam_mesaj_two_week = 0;
  let messageList_two_week = Object.keys(messageData_two_week.channels || {}).map(md => {
    toplam_mesaj_two_week += messageData_two_week.channels[md];
    return {
      Id: md,
      Total: messageData_two_week.channels[md]
    };
  }).sort((a, b) => b.Total - a.Total);

  voiceList_two_week = voiceList_two_week.length > 10 ? voiceList_two_week.splice(0, 10) : voiceList_two_week;
  voiceList_two_week = voiceList_two_week.map((vd, index) => `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");
  category_two_week = category_two_week.length > 10 ? category_two_week.splice(0, 10) : category_two_week;
  category_two_week = category_two_week.map((vc, index) => `\`${index + 1}.\` ${client.channels.cache.has(vc.Id) ? client.channels.cache.get(vc.Id).name.toString() : "#deleted-channel"}: \`${moment.duration(vc.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");

  messageList_two_week = messageList_two_week.length > 10 ? messageList_two_week.splice(0, 10) : messageList_two_week;
  messageList_two_week = messageList_two_week.map((md, index) => `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");
  
  return { category_two_week, toplam_sure_two_week, voiceList_two_week, toplam_mesaj_two_week, messageList_two_week };
}

async function fonksiyon3(voiceData_daily, categoryData_daily, messageData_daily, client) {
  let toplam_sure_daily = 0;
  let voiceList_daily = Object.keys(voiceData_daily.channels || {}).map(vd => {
    toplam_sure_daily += voiceData_daily.channels[vd];
    return {
      Id: vd,
      Total: voiceData_daily.channels[vd]
    };

  }).sort((a, b) => b.Total - a.Total);

  let category_daily = Object.keys(categoryData_daily.category || {}).map(vc => {

    return {
      Id: vc,
      Total: categoryData_daily.category[vc]
    };
  }).sort((a, b) => b.Total - a.Total);
  let toplam_mesaj_daily = 0;
  let messageList_daily = Object.keys(messageData_daily.channels || {}).map(md => {
    toplam_mesaj_daily += messageData_daily.channels[md];
    return {
      Id: md,
      Total: messageData_daily.channels[md]
    };
  }).sort((a, b) => b.Total - a.Total);

  voiceList_daily = voiceList_daily.length > 10 ? voiceList_daily.splice(0, 10) : voiceList_daily;
  voiceList_daily = voiceList_daily.map((vd, index) => `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");
  category_daily = category_daily.length > 10 ? category_daily.splice(0, 10) : category_daily;
  category_daily = category_daily.map((vc, index) => `\`${index + 1}.\` ${client.channels.cache.has(vc.Id) ? client.channels.cache.get(vc.Id).name.toString() : "#deleted-channel"}: \`${moment.duration(vc.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");

  messageList_daily = messageList_daily.length > 10 ? messageList_daily.splice(0, 10) : messageList_daily;
  messageList_daily = messageList_daily.map((md, index) => `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");
  return { category_daily, toplam_sure_daily, voiceList_daily, toplam_mesaj_daily, messageList_daily };
}

async function fonksiyon(voiceData, categoryData, messageData, client) {
  let toplam_sure = 0;
  let voiceList = Object.keys(voiceData.channels || {}).map(vd => {
    toplam_sure += voiceData.channels[vd];
    return {
      Id: vd,
      Total: voiceData.channels[vd]
    };

  }).sort((a, b) => b.Total - a.Total);

  let category = Object.keys(categoryData.category || {}).map(vc => {

    return {
      Id: vc,
      Total: categoryData.category[vc]
    };
  }).sort((a, b) => b.Total - a.Total);
  let toplam_mesaj = 0;
  let messageList = Object.keys(messageData.channels).map(md => {
    toplam_mesaj += messageData.channels[md];
    return {
      Id: md,
      Total: messageData.channels[md]
    };
  }).sort((a, b) => b.Total - a.Total);

  voiceList = voiceList.length > 10 ? voiceList.splice(0, 10) : voiceList;
  voiceList = voiceList.map((vd, index) => `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");
  category = category.length > 10 ? category.splice(0, 10) : category;
  category = category.map((vc, index) => `\`${index + 1}.\` ${client.channels.cache.has(vc.Id) ? client.channels.cache.get(vc.Id).name.toString() : "#deleted-channel"}: \`${moment.duration(vc.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");

  messageList = messageList.length > 10 ? messageList.splice(0, 10) : messageList;
  messageList = messageList.map((md, index) => `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");
  return { toplam_sure, toplam_mesaj, category, voiceList, messageList };
}

async function fonksiyon2(voiceData_week, categoryData_week, messageData_week, client) {
  let toplam_sure_week = 0;
  let voiceList_week = Object.keys(voiceData_week.channels || {}).map(vd => {
    toplam_sure_week += voiceData_week.channels[vd];
    return {
      Id: vd,
      Total: voiceData_week.channels[vd]
    };

  }).sort((a, b) => b.Total - a.Total);

  let category_week = Object.keys(categoryData_week.category || {}).map(vc => {

    return {
      Id: vc,
      Total: categoryData_week.category[vc]
    };
  }).sort((a, b) => b.Total - a.Total);
  let toplam_mesaj_week = 0;
  let messageList_week = Object.keys(messageData_week.channels || {}).map(md => {
    toplam_mesaj_week += messageData_week.channels[md];
    return {
      Id: md,
      Total: messageData_week.channels[md]
    };
  }).sort((a, b) => b.Total - a.Total);

  voiceList_week = voiceList_week.length > 10 ? voiceList_week.splice(0, 10) : voiceList_week;
  voiceList_week = voiceList_week.map((vd, index) => `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");
  category_week = category_week.length > 10 ? category_week.splice(0, 10) : category_week;
  category_week = category_week.map((vc, index) => `\`${index + 1}.\` ${client.channels.cache.has(vc.Id) ? client.channels.cache.get(vc.Id).name.toString() : "#deleted-channel"}: \`${moment.duration(vc.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");

  messageList_week = messageList_week.length > 10 ? messageList_week.splice(0, 10) : messageList_week;
  messageList_week = messageList_week.map((md, index) => `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");
  
  return { category_week, toplam_sure_week, voiceList_week, toplam_mesaj_week, messageList_week};
}

function capslock() {
  return (s) => {
    let x = s.toLowerCase();
    if (typeof x !== 'string')
      return '';
    return x.charAt(0).toUpperCase() + x.slice(1);
  };
}
