const {
    MessageEmbed, DiscordAPIError
} = require('discord.js');
const Discord = require('discord.js');
const qdb = require("quick.db");
const ms = require("ms");
const moment = require("moment");

const Database = require("../../Helpers/Database");
/* 
let mongoose = require("mongoose")
mongoose.connect('mongodb+srv://yashinudesu:Y4SH1NU@cluster0-6rwit.gcp.mongodb.net/yashinu-database?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
let Database = require("../../models/invites.js");
*/

exports.run = async (client, message, args) => {
    if (!message.guild) return

    const inviteDataa = new Database("./Servers/" + message.guild.id, "Invites");
    

    let db = new qdb.table("stats");
    let profilDB = new qdb.table("profil")
    let stats_week = new qdb.table("stats_week")
    let stats_two_week = new qdb.table("stats_two_week")
    let mstats_week = new qdb.table("mstats_week")
    let mstats_two_week = new qdb.table("mstats_two_week")
    let role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first();
    let emojis = []
    let count = 0-1;
    role.members.map(x => x.id).map(async x => {

    // 1 HAFTALIK
    let voiceData_week = await stats_week.get(`stats_week.${message.guild.id}.${x}`) || {voice: 0, channels: {}};
    let categoryData_week = await stats_week.get(`stats_week.${message.guild.id}.${x}`) || {voice: 0, category: {}};
    let messageData_week = await mstats_week.get(`message_week.${message.guild.id}.${x}`) || {messages: 0, channels: {}};
    // 2 HAFTALIK
    let voiceData_two_week = await stats_two_week.get(`stats_two_week.${message.guild.id}.${x}`) || {voice: 0, channels: {}};
    let categoryData_two_week = await stats_two_week.get(`stats_two_week.${message.guild.id}.${x}`) || {voice: 0, category: {}};
    let messageData_two_week = await mstats_two_week.get(`message_two_week.${message.guild.id}.${x}`) || {messages: 0, channels: {}};


    // 1 HAFTALK
    let { category_two_week, toplam_sure_two_week, voiceList_two_week, toplam_mesaj_two_week, messageList_two_week } = birhaftalik(voiceData_two_week, categoryData_two_week, messageData_two_week, client);
    
    //2 HAFTALIK
    let { category_week, toplam_sure_week, voiceList_week, toplam_mesaj_week, messageList_week } = ikihaftalik(voiceData_week, categoryData_week, messageData_week, client);
    
        // MESAJ DENETİM BİTİŞ

        var inviteData = inviteDataa.get(`invites.${x}`) || { total: 0, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 };
      //////////////////////////////////////
      let veri = await db.get(`teyit.${message.guild.id}.${x}`);
      if (!veri) veri = await db.set(`teyit.${message.guild.id}.${x}`, {Erkek: 0,Kadin: 0});
      
      //////////////////////////////////////
      count++;
emojis[count] = `<@!${x}> Adlı Üyenin Denetim Kaydı!
**Teyit Miktarı:** 
\`Toplam: ${(veri.Erkek || 0) + (veri.Kadin || 0)} | Erkek: ${veri.Erkek || 0} | Kadın: ${veri.Kadin || 0}\`

**Davet Miktarı:** 
\`Şuan ${(inviteData.total || 0) + (inviteData.bonus || 0)} daveti var! (${inviteData.regular || 0} regular, ${inviteData.bonus || 0} bonus, ${inviteData.leave || 0} leaves, ${inviteData.fake || 0} fake\`)

**Haftalık Kategori Bilgileri**
${category_week ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_week).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Haftalık Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_week.channels).length)} kanalda durmuş\`)
${voiceList_week ? `${voiceList_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**Haftalık Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_week} mesaj\`)
${messageList_week ? messageList_week : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**2 Haftalık Kategori Bilgileri**
${category_two_week ? `\`0.\` Toplam: \`${moment.duration(toplam_sure_two_week).format("H [saat,] m [dakika,] s [saniye]")}\` \n${category_two_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**2 Haftalık Kanal Sıralaması** (\`Toplam ${Number(Object.keys(voiceData_two_week.channels).length)} kanalda durmuş\`)
${voiceList_two_week ? `${voiceList_two_week}` : `Datacenter'da kaydedilen bir veri görüntülenemedi`}

**2 Haftalık Mesaj Bilgisi** (\`Toplam: ${toplam_mesaj_two_week} mesaj\`)
${messageList_two_week ? messageList_two_week : `Datacenter'da kaydedilen bir veri görüntülenemedi`}
`;})

		async function list(listMsg, page, increment) {
		  const entries = Object.entries(emojis);
		
		  // Set up base embed.
		  var embed = new MessageEmbed()
			.setColor(1056085)
			.setTitle('**Günlük / Haftalık / Aylık TOP 5 Stats Bilgileri**')
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


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'denetle',
    description: 'Etiketlenen kullanıcıya belirli miktarda mute cezası vermektedir',
    usage: 'unsesmute [etiket]',
    kategori: 'Moderasyon'
};
function birhaftalik(voiceData_two_week, categoryData_two_week, messageData_two_week, client) {
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

  voiceList_two_week = voiceList_two_week.length > 10 ? voiceList_two_week.splice(0, 5) : voiceList_two_week;
  voiceList_two_week = voiceList_two_week.map((vd, index) => `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");
  category_two_week = category_two_week.length > 10 ? category_two_week.splice(0, 5) : category_two_week;
  category_two_week = category_two_week.map((vc, index) => `\`${index + 1}.\` ${client.channels.cache.has(vc.Id) ? client.channels.cache.get(vc.Id).name : "#deleted-channel"}: \`${moment.duration(vc.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");

  messageList_two_week = messageList_two_week.length > 10 ? messageList_two_week.splice(0, 5) : messageList_two_week;
  messageList_two_week = messageList_two_week.map((md, index) => `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");
  return { category_two_week, toplam_sure_two_week, voiceList_two_week, toplam_mesaj_two_week, messageList_two_week };
}

function ikihaftalik(voiceData_week, categoryData_week, messageData_week, client) {
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

  voiceList_week = voiceList_week.length > 10 ? voiceList_week.splice(0, 5) : voiceList_week;
  voiceList_week = voiceList_week.map((vd, index) => `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");
  category_week = category_week.length > 10 ? category_week.splice(0, 5) : category_week;
  category_week = category_week.map((vc, index) => `\`${index + 1}.\` ${client.channels.cache.has(vc.Id) ? client.channels.cache.get(vc.Id).name : "#deleted-channel"}: \`${moment.duration(vc.Total).format("H [saat,] m [dakika,] s [saniye]")}\``).join("\n");

  messageList_week = messageList_week.length > 10 ? messageList_week.splice(0, 5) : messageList_week;
  messageList_week = messageList_week.map((md, index) => `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");
  return { category_week, toplam_sure_week, voiceList_week, toplam_mesaj_week, messageList_week };
}

