const {
  MessageEmbed
} = require('discord.js');
const qdb = require("quick.db");
const ms = require("ms");
const moment = require("moment");
let stringTable = require("string-table");

exports.run = async (client, message, args) => {
  if (!message.guild) return
  let db = new qdb.table("gorev_list");
  let message_week = new qdb.table("mstats_week")
  let message_daily = new qdb.table("mstats_daily")
  let message_two_week = new qdb.table("mstats_two_week")
  let message_three_week = new qdb.table("mstats_three_week")
  let message_month = new qdb.table("mstats_month")
  let stats_daily = new qdb.table("stats_daily")
  let stats_week = new qdb.table("stats_week")
  let stats_month = new qdb.table("stats_month")
  let sec = args[0];
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
  let ses = Number(args[2]);
  let mesaj = Number(args[3]);
  let tür = String(args[4])






  if (sec == "oluştur") {
    if (!rol && !ses && !mesaj) return message.reply("Doğru Kullanım: `.görev oluştur ROLID 100(ses) 5000(mesaj) günlük/haftalık/aylık`")
    if (tür !== "günlük" && tür !== "haftalık" && tür !== "aylık") return message.reply("Lütfen bir tür belirleyiniz (günlük/haftalık/aylık)")
    let data = await db.get(`gorevler_${tür}`)
    message.guild.members.cache.filter(x => x.roles.cache.has(rol.id)).forEach(async y => {
      data = await db.set(`gorevler_${tür}.${y.id}`, { 
        RolID: rol.id, 
        Tur: tür,
        Ses: ses, 
        Mesaj: mesaj
      })
    })
    message.channel.send("Başarılı bir şekilde " + rol + " adlı yetki için günlük görev oluşturdun!")
  }

  if (sec == "bilgi") {
    let target = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
    if (!target) return message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
    if (args[1] !== "günlük" && args[1] !== "haftalık" && args[1] !== "aylık" ) message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
          let data = await db.get(`gorevler_${args[1]}`)
          const görev = Object.keys(data).filter(userid => data[userid].RolID === target.id && data[userid].Tur === args[1]);
          if (!görev || görev.length === 0) return message.react(`${client.emojis.cache.find(x => x.name === "owsla_iptal")}`);
          const hedef_ses = data[görev[0]].Ses;
          const hedef_mesaj = data[görev[0]].Mesaj;
          let tablo = [];
          görev.forEach(async MemberID => { 
          let RoleMember = message.guild.members.cache.get(MemberID);
          //////////////////////////
          // DATABASE
          //////////////////////////
          let veri = args[1] == "günlük" ? stats_daily.get(`stats_daily.${message.guild.id}.${MemberID}`) : args[1] == "haftalık" ? stats_week.get(`stats_week.${message.guild.id}.${MemberID}`) : args[1] == "aylık" ? stats_month.get(`stats_month.${message.guild.id}.${MemberID}`) : {voice: 0, channels: {}}
          let kullanıcı_ses = 0;
          let gunluk_data = veri || {voice: 0, channels: {}};
          Object.keys(gunluk_data.channels || {}).map(vd => {
            kullanıcı_ses += gunluk_data.channels[vd];
          })
          //////////////////////////
          // GÜNLÜK MESAJ
          //////////////////////////
          let veri2 = args[1] === "günlük" ? message_daily.get(`message_daily.${message.guild.id}.${MemberID}`) : args[1] === "haftalık" ? message_week.get(`message_week.${message.guild.id}.${MemberID}`) : args[1] === "aylık" ? message_month.get(`message_month.${message.guild.id}.${MemberID}`) : {messages: 0, channels: {}}
          let kullanıcı_mesaj = 0
          let mgunluk_data = veri2 || {messages: 0, channels: {}}
          Object.keys(mgunluk_data.channels || {}).map(md => {
            kullanıcı_mesaj += mgunluk_data.channels[md];
          });


          let SesBilgi = Number(moment.duration(kullanıcı_ses).format("H")) < hedef_ses ? "-" : "+";
          let MesajBilgi = kullanıcı_mesaj < hedef_mesaj ? "-" : "+";
          let total = SesBilgi === "+" && MesajBilgi === "+" ? "+" : "-"
          tablo.push({
          ID: RoleMember.id,
          İsim: message.guild.members.cache.get(RoleMember.id).displayName,
          S: SesBilgi,
          M: MesajBilgi,
          T: total
          });

          });


      let mesaj = stringTable.create(tablo)


client.splitEmbedWithDesc(`Başarılı bir şekilde ${target} rolünün ${args[1]} görev katılımcılarını listeledin
\`Bu Rolün Görevleri:\`

**${hedef_ses} saat** ses aktifliği
****${hedef_mesaj} mesaj**** chat aktifliği gerektirmektedir
\`\`\`Tablo Açıklaması:

T: 2 Görev yapıldığı zaman + olmaktadır.
S: Ses aktifliği tamamlanınca + olur
M: Mesaj aktifliği tamamlanınca + olur\`\`\`
\`\`\`${mesaj}\`\`\`

\`Yetki denetimi yukarıdaki istatistiklere göre değerlendirilecektir kimsenin emeği ve hakkı yenmeyecektir\` **${message.guild.name} 💜**
`,
{name: message.author.tag, icon: message.author.avatarURL({dynamic: true})},
{name: client.ayarlar.footer, icon: false},
{setColor: ["RANDOM"]}).then(list => {
list.forEach(item => {
return message.channel.send(item);
});
});
      
  }
  
  if (sec === "günlük" || sec === "haftalık" || sec === "aylık") {
    
    let data = await db.get(`gorevler_${args[0]}`)
    let veriler = Object.entries(data)
    veriler.reverse()
    .map(x => x)[0]
    .filter(x => x.RolID)
    .map(y => Object.assign({
      RolNAME: message.guild.roles.cache.get(y.RolID).name,
      Ses: y.Ses + " saat",
      Mesaj: y.Mesaj + " mesaj",
      Tür: args[0] + " görev",
      Başlangıç: moment(y.Baslangic).format("LLL")
    }))
    let table = stringTable.create(veriler)
    return message.channel.send(table, {code: "md", split: true})
  }








};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["görevler"],
  permLevel: 0
};

exports.help = {
  name: 'görev',
  description: 'Etiketlenen kullanıcıya belirli miktarda mute cezası vermektedir',
  usage: 'unsesmute [etiket]',
  kategori: 'Moderasyon'
};
