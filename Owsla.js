require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
moment.locale("tr");
let qdb = require("quick.db");
let sunucuayarDB = new qdb.table("sunucuayar");
let rolAyarlarDB = new qdb.table("rolayarlar");
let prefixDB = new qdb.table("prefix");
let profilDB = new qdb.table("profil");
let guvenliKisiDB = new qdb.table("guvenlikisi");
let sesdb = new qdb.table("stats");
let cezaDB = new qdb.table("cezalar");
let inviteDB = new qdb.table("invitemanager");


const ms = require('parse-ms');
require('./util/eventLoader')(client);
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./komutlar/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./komutlar/${f}/` + file);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name);
        });
      })
    })
  });
});

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-.]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.ayarlar = {
  "prefix": [".", "!", "z!", "Z!"],
  "token": "ODI3OTYyNTgyMjA3MDM3NDUy.YGiqPg.SwsIVB0KY2srPai06WeLnUm9D1k",
  "yapimci": ["466217857609498627", "720358716670476408"],
  "footer": "Justice 💛 Zion",
  "readyFooter": ["Justice 💜 Zion"],
  "kufurler": ["@here", "@everyone", "anskm", "orosbu", "orosb", "0r0spuc0cu", "4n4n1 sk3r1m", "p1c", "@n@nı skrm", "evladi", "orsb", "orsbcogu", "amnskm", "anaskm", "mk", "oc", "abaza", "abazan", "ag", "ağzına sıçayım", "fuck",
    "shit", "ahmak", "seks", "sex", "allahsız", "amarım", "ambiti", "am biti", "amcığı", "amcığın", "amcığını", "amcığınızı", "amcık", "amcık hoşafı", "amcıklama", "amcıklandı", "amcik", "amck",
    "amckl", "amcklama", "amcklaryla", "amckta", "amcktan", "amcuk", "amık", "amına", "amınako", "amına koy", "amına koyarım", "amına koyayım", "amınakoyim", "amına koyyim", "amına s", "amına sikem",
    "amına sokam", "amın feryadı", "amını", "amını s", "amın oglu", "amınoğlu", "amın oğlu", "amısına", "amısını", "amina", "amina g", "amina k", "aminako", "aminakoyarim", "amina koyarim", "amina koyayım",
    "amina koyayim", "aminakoyim", "aminda", "amindan", "amindayken", "amini", "aminiyarraaniskiim", "aminoglu", "amin oglu", "amiyum", "amk", "amkafa", "amk çocuğu", "amlarnzn", "amlı", "amm", "ammak", "ammna",
    "amn", "amna", "amnda", "amndaki", "amngtn", "amnn", "amona", "amq", "amsız", "amsiz", "amsz", "amteri", "amugaa", "amuğa", "amuna", "ana", "anaaann", "anal", "analarn", "anam", "anamla", "anan", "anana", "anandan",
    "ananı", "ananı", "ananın", "ananın am", "ananın amı", "ananın dölü", "ananınki", "ananısikerim", "ananı sikerim", "ananısikeyim", "ananı sikeyim", "ananızın", "ananızın am", "anani", "ananin", "ananisikerim", "anani sikerim",
    "ananisikeyim", "anani sikeyim", "anann", "ananz", "anas", "anasını", "anasının am", "anası orospu", "anasi", "anasinin", "anay", "anayin", "angut", "anneni", "annenin", "annesiz", "anuna", "aptal", "aq", "a.q", "a.q.", "aq.", "ass",
    "atkafası", "atmık", "attırdığım", "attrrm", "auzlu", "avrat", "ayklarmalrmsikerim", "azdım", "azdır", "azdırıcı", "babaannesi kaşar", "babanı", "babanın", "babani", "babası pezevenk", "bacağına sıçayım", "bacına", "bacını",
    "bacının", "bacini", "bacn", "bacndan", "bacy", "bastard", "basur", "beyinsiz", "bızır", "bitch", "biting", "bok", "boka", "bokbok", "bokça", "bokhu", "bokkkumu", "boklar", "boktan", "boku", "bokubokuna", "bokum", "bombok", "boner",
    "bosalmak", "boşalmak", "cenabet", "cibiliyetsiz", "cibilliyetini", "cibilliyetsiz", "cif", "cikar", "cim", "çük", "dalaksız", "dallama", "daltassak", "dalyarak", "dalyarrak", "dangalak", "dassagi", "diktim", "dildo", "dingil",
    "dingilini", "dinsiz", "dkerim", "domal", "domalan", "domaldı", "domaldın", "domalık", "domalıyor", "domalmak", "domalmış", "domalsın", "domalt", "domaltarak", "domaltıp", "domaltır", "domaltırım", "domaltip", "domaltmak", "dölü",
    "dönek", "düdük", "eben", "ebeni", "ebenin", "ebeninki", "ebleh", "ecdadını", "ecdadini", "embesil", "emi", "fahise", "fahişe", "feriştah", "ferre", "fuck", "fucker", "fuckin", "fucking", "gavad", "gavat", "geber", "geberik", "gebermek",
    "gebermiş", "gebertir", "gerızekalı", "gerizekalı", "gerizekali", "gerzek", "giberim", "giberler", "gibis", "gibiş", "gibmek", "gibtiler", "goddamn", "godoş", "godumun", "gotelek", "gotlalesi", "gotlu", "gotten", "gotundeki",
    "gotunden", "gotune", "gotunu", "gotveren", "goyiim", "goyum", "goyuyim", "goyyim", "göt", "göt deliği", "götelek", "göt herif", "götlalesi", "götlek", "götoğlanı", "göt oğlanı", "götoş", "götten", "götü", "götün", "götüne",
    "götünekoyim", "götüne koyim", "götünü", "götveren", "göt veren", "göt verir", "gtelek", "gtn", "gtnde", "gtnden", "gtne", "gtten", "gtveren", "hasiktir", "hassikome", "hassiktir", "has siktir", "hassittir", "haysiyetsiz",
    "hayvan herif", "hoşafı", "hödük", "hsktr", "huur", "ıbnelık", "ibina", "ibine", "ibinenin", "ibne", "ibnedir", "ibneleri", "ibnelik", "ibnelri", "ibneni", "ibnenin", "ibnerator", "ibnesi", "idiot", "idiyot", "imansz", "ipne",
    "iserim", "işerim", "itoğlu it", "kafam girsin", "kafasız", "kafasiz", "kahpe", "kahpenin", "kahpenin feryadı", "kaka", "kaltak", "kancık", "kancik", "kappe", "karhane", "kaşar", "kavat", "kavatn", "kaypak", "kayyum", "kerane",
    "kerhane", "kerhanelerde", "kevase", "kevaşe", "kevvase", "koca göt", "koduğmun", "koduğmunun", "kodumun", "kodumunun", "koduumun", "koyarm", "koyayım", "koyiim", "koyiiym", "koyim", "koyum", "koyyim", "krar", "kukudaym",
    "laciye boyadım", "lavuk", "liboş", "madafaka", "mal", "malafat", "malak", "manyak", "mcik", "meme", "memelerini", "mezveleli", "minaamcık", "mincikliyim", "mna", "monakkoluyum", "motherfucker", "mudik", "oc", "ocuu", "ocuun",
    "Oç", "oç", "o. çocuğu", "oğlan", "oğlancı", "oğlu it", "orosbucocuu", "orospu", "orospucocugu", "orospu cocugu", "orospu çoc", "orospuçocuğu", "orospu çocuğu", "orospu çocuğudur", "orospu çocukları", "orospudur", "orospular",
    "orospunun", "orospunun evladı", "orospuydu", "orospuyuz", "orostoban", "orostopol", "orrospu", "oruspu", "oruspuçocuğu", "oruspu çocuğu", "osbir", "ossurduum", "ossurmak", "ossuruk", "osur", "osurduu", "osuruk", "osururum",
    "otuzbir", "öküz", "öşex", "patlak zar", "penis", "pezevek", "pezeven", "pezeveng", "pezevengi", "pezevengin evladı", "pezevenk", "pezo", "pic", "pici", "picler", "piç", "piçin oğlu", "piç kurusu", "piçler", "pipi", "pipiş", "pisliktir",
    "porno", "pussy", "puşt", "puşttur", "rahminde", "revizyonist", "s1kerim", "s1kerm", "s1krm", "sakso", "saksofon", "salaak", "salak", "saxo", "sekis", "serefsiz", "sevgi koyarım", "sevişelim", "sexs", "sıçarım", "sıçtığım", "sıecem",
    "sicarsin", "sie", "sik", "sikdi", "sikdiğim", "sike", "sikecem", "sikem", "siken", "sikenin", "siker", "sikerim", "sikerler", "sikersin", "sikertir", "sikertmek", "sikesen", "sikesicenin", "sikey", "sikeydim", "sikeyim", "sikeym",
    "siki", "sikicem", "sikici", "sikien", "sikienler", "sikiiim", "sikiiimmm", "sikiim", "sikiir", "sikiirken", "sikik", "sikil", "sikildiini", "sikilesice", "sikilmi", "sikilmie", "sikilmis", "sikilmiş", "sikilsin", "sikim", "sikimde",
    "sikimden", "sikime", "sikimi", "sikimiin", "sikimin", "sikimle", "sikimsonik", "sikimtrak", "sikin", "sikinde", "sikinden", "sikine", "sikini", "sikip", "sikis", "sikisek", "sikisen", "sikish", "sikismis", "sikiş", "sikişen",
    "sikişme", "sikitiin", "sikiyim", "sikiym", "sikiyorum", "sikkim", "sikko", "sikleri", "sikleriii", "sikli", "sikm", "sikmek", "sikmem", "sikmiler", "sikmisligim", "siksem", "sikseydin", "sikseyidin", "siksin", "siksinbaya",
    "siksinler", "siksiz", "siksok", "siksz", "sikt", "sikti", "siktigimin", "siktigiminin", "siktiğim", "siktiğimin", "siktiğiminin", "siktii", "siktiim", "siktiimin", "siktiiminin", "siktiler", "siktim", "siktim", "siktimin",
    "siktiminin", "siktir", "siktir et", "siktirgit", "siktir git", "siktirir", "siktiririm", "siktiriyor", "siktir lan", "siktirolgit", "siktir ol git", "sittimin", "sittir", "skcem", "skecem", "skem", "sker", "skerim", "skerm",
    "skeyim", "skiim", "skik", "skim", "skime", "skmek", "sksin", "sksn", "sksz", "sktiimin", "sktrr", "skyim", "slaleni", "sokam", "sokarım", "sokarim", "sokarm", "sokarmkoduumun", "sokayım", "sokaym", "sokiim", "soktuğumunun", "sokuk",
    "sokum", "sokuş", "sokuyum", "soxum", "sulaleni", "sülaleni", "sülalenizi", "sürtük", "şerefsiz", "şıllık", "taaklarn", "taaklarna", "tarrakimin", "tasak", "tassak", "taşak", "taşşak", "tipini s.k", "tipinizi s.keyim", "tiyniyat",
    "toplarm", "topsun", "totoş", "vajina", "vajinanı", "veled", "veledizina", "veled i zina", "verdiimin", "weled", "weledizina", "whore", "xikeyim", "yaaraaa", "yalama", "yalarım", "yalarun", "yaraaam", "yarak", "yaraksız", "yaraktr",
    "yaram", "yaraminbasi", "yaramn", "yararmorospunun", "yarra", "yarraaaa", "yarraak", "yarraam", "yarraamı", "yarragi", "yarragimi", "yarragina", "yarragindan", "yarragm", "yarrağ", "yarrağım", "yarrağımı", "yarraimin", "yarrak",
    "yarram", "yarramin", "yarraminbaşı", "yarramn", "yarran", "yarrana", "yarrrak", "yavak", "yavş", "yavşak", "yavşaktır", "yavuşak", "yılışık", "yilisik", "yogurtlayam", "yoğurtlayam", "yrrak", "zıkkımım", "zibidi", "zigsin", "zikeyim",
    "zikiiim", "zikiim", "zikik", "zikim", "ziksiiin", "ziksiin", "zulliyetini", "zviyetini", "4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka",
    "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch",
    "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs",
    "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris",
    "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok",
    "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts",
    "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker",
    "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag",
    "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio",
    "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook",
    "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker",
    "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell",
    "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead",
    "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate",
    "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz",
    "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin",
    "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah",
    "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker",
    "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop",
    "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing",
    "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting",
    "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez",
    "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina",
    "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"
  ]
}


//#region Invite Manager
const Invites = new Discord.Collection();

//#region Load
client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites().then(_invites => {
      Invites.set(guild.id, _invites);
    }).catch(err => {});
  });
});
client.on("inviteCreate", (invite) => {
  var gi = Invites.get(invite.guild.id);
  gi.set(invite.code, invite);
  Invites.set(invite.guild.id, gi);
});
client.on("inviteDelete", (invite) => {
  var gi = Invites.get(invite.guild.id);
  gi.delete(invite.code);
  Invites.set(invite.guild.id, gi);
});
//#endregion

//#region Continuity

client.on("guildCreate", (guild) => {
  guild.fetchInvites().then(invites => {
    Invites.set(guild.id, invites);
  }).catch(e => {})
});

//#endregion

//#region Counter
client.on("guildMemberAdd", async (member) => {
  const gi = (Invites.get(member.guild.id) || new Collection()).clone()
  const settings = sunucuayarDB.get(`sunucuayar.invite_kanal`) || {};
  let guild = member.guild
  let total = 0
  let regular = 0 
  let _fake = 0
  let bonus = 0;

  let fake = (Date.now() - member.createdAt) / (1000 * 60 * 60 * 24) <= 3 ? true : false

  guild.fetchInvites().then(async invites => {
    // var invite = invites.find(_i => gi.has(_i.code) && gi.get(_i.code).maxUses != 1 && gi.get(_i.code).uses < _i.uses) || gi.find(_i => !invites.has(_i.code)) || guild.vanityURLCode;
    let invite = invites.find(_i => gi.has(_i.code) && gi.get(_i.code).uses < _i.uses) || gi.find(_i => !invites.has(_i.code)) || guild.vanityURLCode;
    Invites.set(member.guild.id, invites);

    if (invite == guild.vanityURLCode) client.channels.cache.get(settings).send(`-member- katıldı! Davet eden: \`Bulunamadı\` :tada:`);


    if (invite.inviter) {
      await inviteDB.set(`invites.${member.id}.inviter`, invite.inviter.id);
      if (fake) {
        total = await inviteDB.add(`invites.${invite.inviter.id}.total`, 1);
        _fake = await inviteDB.add(`invites.${invite.inviter.id}.fake`, 1);
      } else {
        total = await inviteDB.add(`invites.${invite.inviter.id}.total`, 1);
        regular = await inviteDB.add(`invites.${invite.inviter.id}.regular`, 1);
      }
      bonus = await inviteDB.get(`invites.${invite.inviter.id}.bonus`) || 0;

    }

    await inviteDB.set(`invites.${member.id}.isfake`, fake);


      client.channels.cache.get(settings).send("-member- katıldı! Davet eden: -target- (-total- davet :white_check_mark:)").replace("-member-", `${member}`)
      .replace("-target-", `${invite.inviter}`)
      .replace("-total-", `${total + bonus}`)
      .replace("-regular-", `${regular}`)
      .replace("-fakecount-", `${_fake}`)
      .replace("-invite-", `${invite && invite.code != undefined ? invite.code : "what is that?"}`)
      .replace("-fake-", `${fake}`);;

  }).catch();
});

client.on("guildMemberRemove", async (member) => {
  const db = inviteDB
  const settings = sunucuayarDB.get(`sunucuayar.invite_kanal`) || {};
  var total = 0,
    bonus = 0,
    regular = 0,
    fakecount = 0,
    data = db.get(`invites.${member.id}`);
  if (!data) return;

  if (data.isfake && data.inviter) {
    fakecount = db.subtract(`invites.${data.inviter}.fake`, 1);
    total = db.subtract(`invites.${data.inviter}.total`, 1);
  } else if (data.inviter) {
    regular = db.subtract(`invites.${data.inviter}.regular`, 1);
    total = db.subtract(`invites.${data.inviter}.total`, 1);
  }
  if (data.inviter) bonus = db.get(`invites.${data.inviter}.bonus`) || 0;

  db.add(`invites.${data.inviter}.leave`, 1);
    client.channels.cache.get(settings).send(`-member- adlı üye aramızdan ayrıldı!`).replace("-member-", `${member}`)

});
//#endregion


client.on("guildMemberAdd", async (member) => {
  if (!member.guild) return;
  try {
    // VERİLERİMİ BU SATIRDA ÇEKİYORUM
    let kanalKontrol = member.guild.channels.cache
    let kayitSorumlusu = await rolAyarlarDB.get(`rolayarlar.kayit_sorumlusu`)
    let otoRol = await sunucuayarDB.get(`sunucuayar.kayitsiz_uye`);
    let kayitKanal = await sunucuayarDB.get(`sunucuayar.kayit_kanal`);
    let otoTag = await sunucuayarDB.get(`sunucuayar.oto_tag`);
    let isimTemizleyici = await sunucuayarDB.get(`sunucuayar.isimTemizleyici`);
    let supheliRol = await sunucuayarDB.get(`sunucuayar.supheli_rol`);
    let odb = new qdb.table("otokayit");
    
    // İŞLEMLER BU SATIRDAN SONRA DEVAM EDİYOR


    if (otoTag) {
      let isim = otoTag.replace(`-uye-`, `${member.user.username}`);
      if (!isimTemizleyici) {
        member.setNickname(isim).catch(() => {})
      }
      let isim2 = otoTag.replace(`-uye-`, `${member.user.username.replace(/\W/g, '')}`);
      member.setNickname(isim2).catch(() => {})
    }


    // BOT KORUMA SİSTEMİ


    
    if (supheliRol && kayitKanal && kanalKontrol.get(kayitKanal) && kayitSorumlusu) {
     
      let durum = "";
      let x = moment(member.user.createdAt).add(7, 'days').fromNow();
      x = x.replace("birkaç saniye önce", " ");
      if (!x.includes("önce") || x.includes("sonra") | x == " ") {
        durum = "Güvenli Değil"

        setTimeout(async () => {
          await member.roles.set([supheliRol]).catch(() => {})
        }, 50)
        return kanalKontrol.get(kayitKanal).send(`\`${member.user.username}\` adlı kullanıcının hesabı 7 Gün'den önce açıldığı için karantinaya gönderildi`);
      } else {
        durum = "`Güvenli`"
      }

if (sunucuayarDB.get(`sunucuayar.otokayit`)) {
  if (await odb.get(`otokayit.${member.id}`)) {
    member.setNickname(await odb.get(`otokayit.${member.id}.Tag`) + " " + await odb.get(`otokayit.${member.id}.Name`).replace(await odb.get(`otokayit.${member.id}.Tag`), ""))

      member.roles.set(await odb.get(`otokayit.${member.id}.Role`))
    return kanalKontrol.get(kayitKanal).send(`:tada: Sunucumuza hoş geldin ${member} daha önceden kayıt edildiğin için direk içeriye alındın!`)
  }
  await member.roles.set(otoRol).catch(() => {})
}
await member.roles.set(otoRol).catch(() => {})


kanalKontrol.get(kayitKanal).send(`
:tada: Sunucumuza hoş geldin ${member}

Hesabın ${member.user.createdAt.toTurkishFormatDate()} tarihinde (${member.client.tarihHesapla(member.user.createdAt)}) oluşturulmuş.

Sunucu kurallarımız <#${sunucuayarDB.get(`sunucuayar.kurallar_kanal`)}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.

Seninle beraber ${member.guild.memberCount} kişi olduk ! Tagımızı alarak bizlere destek olabilirsin ! Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor yetkililerimiz seninle ilgilenecektir ! İyi eğlenceler.`)
}
  } catch (err) {
    console.log(err)
  }
});

client.on("message", async (msg) => {
  if (!msg.guild || msg.author.id === client.user.id) return;
  let reklamKoruma = await sunucuayarDB.get(`sunucuayar.reklam_koruma`);

  if (reklamKoruma) {
    try {
      const kelime = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
      if (kelime.some(reklam => msg.content.includes(reklam))) {
        if (msg.member.permissions.has(8)) return
        msg.channel.send(`Hey ${msg.author}, sunucuda link paylaşamazsın!`)
        if (msg.deletable) msg.delete({
          timeout: 200
        }).catch(err => {});
      } else {
        let links = msg.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}?\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
        if (!links) return;
        if (msg.member.permissions.has(8)) return
        if (msg.deletable) msg.delete({
          timeout: 200
        }).catch(err => {});
        msg.channel.send(`Hey ${msg.author}, sunucuda link paylaşamazsın!`).then(x => x.delete({
          timeout: 5000
        }))
      }
    } catch (err) {}

  }
})

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (!newMsg.guild || newMsg.author.id === client.user.id) return;
  let reklamKoruma = await sunucuayarDB.get(`sunucuayar.reklam_koruma`);
  if (reklamKoruma) {
    try {
      if (newMsg.member.permissions.has(8)) return
      const kelime = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
      if (kelime.some(reklam => newMsg.content.includes(reklam))) {
        newMsg.channel.send(`Hey ${newMsg.author}, sunucuda link paylaşamazsın!`)
        if (newMsg.deletable) newMsg.delete({
          timeout: 200
        }).catch(err => {});
      } else {
        let links = newMsg.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}?\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
        if (!links) return;
        if (newMsg.deletable) newMsg.delete({
          timeout: 200
        }).catch(err => {});
        newMsg.channel.send(`Hey ${newMsg.author}, sunucuda link paylaşamazsın!`).then(x => x.delete({
          timeout: 5000
        }))
      }
    } catch (err) {}

  }
});


client.on("message", async function (msg) {
  if (!msg.guild || msg.author.id === client.user.id) return;
  let kufurKoruma = await sunucuayarDB.get(`sunucuayar.kufur_koruma`);
  if (kufurKoruma) {
    try {
      let args = msg.content.split(" ");
      const kufurler = client.ayarlar.kufurler
      if (kufurler.some(word => args.some(c => word.toLowerCase() == c.toLowerCase()))) {
        if (!msg.member.permissions.has(8)) {
          msg.delete().then(msg => {
            msg.reply(" etme eyleme kardeşim günah ya.").then(m => m.delete({
              timeout: 2000
            })).catch(err => {});
          });
        }
      }
    } catch (err) {}

  }
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (!newMsg.guild || newMsg.member.permissions.has(8) || newMsg.author.id === client.user.id) return;
  let kufur = await sunucuayarDB.get(`sunucuayar.kufur_koruma`);
  if (kufur) {
    try {
      let args = newMsg.content.split(" ");
      const kufurler = client.ayarlar.kufurler
      if (kufurler.some(word => args.some(c => word.toLowerCase() == c.toLowerCase()))) {
        newMsg.delete().then(message => {
          newMsg.reply(" etme eyleme kardeşim günah ya.").then(m => m.delete({
            timeout: 2000
          })).catch(err => {});
        });
      }
    } catch (err) {}

  }
});

client.on("ready", async () => {
let tag = sunucuayarDB.get(`sunucuayar.sunucu_tag`)
let tag2 = sunucuayarDB.get(`sunucuayar.tag2`) || tag
let rol = await sunucuayarDB.get(`sunucuayar.ekip_rol`)
    client.guilds.cache.map(x => {
      let sunucu = x.id
      setInterval(async () => {
        client.guilds.cache.get(sunucu).members.cache.filter(uye => uye.user.username.includes(tag)).map(async (uye2) => {
          if (uye2.roles.cache.get(rol)) return
            await uye2.setNickname((uye2.displayName).replace(tag2, tag)).catch(() => { });
            await uye2.roles.add(rol).catch(() => {})
        });
      }, 5000)
    })
})
client.on("ready", async () => {
  setInterval(async () => {
    client.guilds.cache.forEach(async guild => {
      let yasakliTaglar = await sunucuayarDB.get(`sunucuayar.yasaklitaglar`)
      let yasakliTag = await sunucuayarDB.get(`sunucuayar.yasaklitag_rol`);
      let jail = await sunucuayarDB.get(`sunucuayar.jail_rol`);
      let mute = await sunucuayarDB.get(`sunucuayar.muted_rol`);
      let voiceMute = await sunucuayarDB.get(`sunucuayar.voice_muted_rol`);
      let boosterRol = await sunucuayarDB.get(`sunucuayar.booster_rol`)
      let kayitsizuyeRol = await sunucuayarDB.get(`sunucuayar.kayitsiz_uye`)


      let sunucu = guild.id
      let data = await cezaDB.get(`cezalar`) || [];
      data.reverse();
      client.guilds.cache.get(sunucu).members.cache.map(async x => {
        let tr = false
        for (let i in yasakliTaglar) {
          if (x.user.username.includes(yasakliTaglar[i]))
            tr = true
        };
        if (tr) {
          if (x.roles.cache.get(yasakliTag)) return;
          x.roles.set([yasakliTag]).catch(() => {})
        };
  
        
        let profil = await profilDB.get(`profil.${x.id}.uyari`)
        if (!await profilDB.get(`profil.${x.id}.uyari`))
          profil = await profilDB.set(`profil.${x.id}.uyari`, { Mute: false,Jail: false,Voice_Mute: false });
  
        if (profil.Jail == true) {
          // SÜRE SAYACI
          if (Date.now() >= data.filter(kontrol => kontrol.Member == x.id && kontrol.Type === "Jail").map(bak => bak.Bitis)[0]) {
            let uyari = await profilDB.get(`profil.${x.id}.uyari`);
            uyari.Jail = false;
            await profilDB.set(`profil.${x.id}.uyari`, uyari);
            setTimeout(async function () {
              await x.roles.set(x.roles.cache.get(boosterRol) ? x.roles.set(kayitsizuyeRol, boosterRol) : x.roles.set(kayitsizuyeRol)).catch(() => {})
            }, 60)
          }
          // SÜRE SAYACI BİTİŞ
          setTimeout(async function () {
            await x.roles.set(x.roles.cache.get(boosterRol) ? x.roles.set([jail, boosterRol]) : x.roles.set([jail])).catch(() => {})
          }, 10)
        } else if (profil.Mute == true) {
          // SÜRE SAYACI
          if (Date.now() >= data.filter(kontrol => kontrol.Member == x.id && kontrol.Type === "Mute").map(bak => bak.Bitis)[0]) {
            let uyari = await profilDB.get(`profil.${x.id}.uyari`);
            uyari.Mute = false;
            await profilDB.set(`profil.${x.id}.uyari`, uyari);
            setTimeout(async function () {
              await x.roles.remove(mute).catch(() => {})
            }, 50)
          }
           // SÜRE SAYACI BİTİŞ
          setTimeout(async function () {
            await x.roles.add(mute).catch(() => {});
          }, 20)
        } else if (profil.Voice_Mute == true) {
          // SÜRE SAYACI
          if (Date.now() >= data.filter(kontrol => kontrol.Member == x.id && kontrol.Type === "Ses Mute").map(bak => bak.Bitis)[0]) {
            let uyari = await profilDB.get(`profil.${x.id}.uyari`);
            uyari.Voice_Mute = false;
            await profilDB.set(`profil.${x.id}.uyari`, uyari); // çık gir yapınca tekrar verme
            setTimeout(async function () {
              await x.voice.setChannel(null).catch(() => {})
              await x.roles.remove(voiceMute).catch(() => {})
            }, 40)
          }
          // SÜRE SAYACI BİTİŞ
          setTimeout(async function () {
            await x.roles.add(voiceMute).catch(() => {})
          }, 30)
        }
        });
    });
  }, 1000*10);
})
// OTOTAG SİSTEMİ

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    client.guilds.cache.forEach(async guild => {
      let db = new qdb.table("sunucuayar")
      var sunucu2 = client.guilds.cache.get(guild.id); // Buraya Sunucu ID
      var uye = sunucu2.members.cache.get(newUser.id);
      let tag = await db.get(`sunucuayar.sunucu_tag`);
      let tag2 = await db.get(`sunucuayar.tag2`) || tag
      let sunucu = guild.id
      let rol = await db.get(`sunucuayar.ekip_rol`)
      let kanal = await db.get(`sunucuayar.ekip_log_kanal`)
      if (!client.channels.cache.get(kanal)) return;
      let kayitsizuyeRol = await db.get(`sunucuayar.kayitsiz_uye`)
      let erkekrol = await db.get(`sunucuayar.erkek_rol`)
      let kadinrol = await db.get(`sunucuayar.kadin_rol`)
      let sunucubakım = await db.get(`sunucubakim.${guild.id}`)
      let yasakliTaglar = await sunucuayarDB.get(`sunucuayar.yasaklitaglar`)

      let kisi = client.guilds.cache.get(sunucu).members.cache.get(newUser.id);
      const tagsayisi = client.guilds.cache.get(sunucu).members.cache.filter(member => member.user.username.includes(tag)).size
      if (tag && rol && kisi && tagsayisi && kayitsizuyeRol && erkekrol && kadinrol) {

          let tr = false
          for (let i in yasakliTaglar) {
            if (!newUser.user.username.includes(yasakliTaglar[i]) && oldUser.username.includes(yasakliTaglar[i]))
              tr = true
          };
          if (tr) {
            newUser.roles.set(kayitsizuyeRol).catch(() => {})
          };



        if (newUser.username.includes(tag) && !oldUser.username.includes(tag)) {
          await uye.setNickname((uye.displayName).replace(tag2, tag)).catch(() => {});
          const ototagembed = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setAuthor(client.user.username, client.user.avatarURL())
            .setDescription(`
**${newUser}**, adlı üye ismine \`${tag}\` tagını eklediği için <@&${rol}> adlı rolü kazandı
`)
            .addField(`Üye Hakkında`, `
**Üye Adı:** \`${newUser.username}\`
**Üye ID:** \`${newUser.id}\` `, true)
            .addField(`Üye Hakkında`, `
**Üye Etiket:** ${newUser}
**Taglı Üye: ** \`${tagsayisi} Kişi\``, true)

          if (client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(kayitsizuyeRol)) {
            return client.channels.cache.get(kanal).send(ototagembed)
          } else {
            await kisi.roles.add(rol).catch(() => {});
            return client.channels.cache.get(kanal).send(ototagembed)
          }
        }
        

        if (!newUser.username.includes(tag) && oldUser.username.includes(tag)) {
          if (sunucubakım) {
            await kisi.roles.set(kayitsizuyeRol).catch(() => {})
          } else {
            client.guilds.cache.get(sunucu).members.cache.forEach(m => {
              if (m.id !== newUser.id) return
              if (kisi.roles.cache.some(rol => erkekrol.some(x => x == rol))) {
                kisi.roles.set(erkekrol).catch(() => {
                  kisi.roles.set(kayitsizuyeRol).catch(() => {})
                });
              }
              if (kisi.roles.cache.some(rol => kadinrol.some(x => x == rol))) {
                kisi.roles.set(kadinrol).catch(() => {
                  kisi.roles.set(kayitsizuyeRol).catch(() => {})
                });
              }
            })
          }
          await uye.setNickname((uye.displayName).replace(tag, tag2)).catch(() => {})
          await kisi.roles.remove(rol).catch(() => {})
          const ototagembed2 = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setAuthor(client.user.username, client.user.avatarURL())
            .setDescription(`
**${newUser}**, adlı üye isminden \`${tag}\` tagımızı sildiği için <@&${rol}> adlı rolü kaybetti
`)
            .addField(`Üye Hakkında`, `
**Üye Adı:** \`${newUser.username}\`
**Üye ID:** \`${newUser.id}\` `, true)
            .addField(`Üye Hakkında`, `
**Üye Etiket:** ${newUser}
**Taglı Üye: ** \`${tagsayisi} Kişi\``, true)

          return client.channels.cache.get(kanal).send(ototagembed2)
        }
      }

    })
  }
});





const Activites = new Map();
client.on("voiceStateUpdate", async (oldState, newState) => {
  let stats_week = new qdb.table("stats_week")
  let stats_daily = new qdb.table("stats_daily")
  let stats_two_week = new qdb.table("stats_two_week")
  let stats_three_week = new qdb.table("stats_three_week")
  let stats_month = new qdb.table("stats_month")
  if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
  if(!oldState.channelID && newState.channelID) { // Kanala Girince
      Activites.set(oldState.id, Date.now());
  }
  let data;
  if(!Activites.has(oldState.id)){
      data = Date.now();
      Activites.set(oldState.id, data); // Verileri Kontrol Etme
  }
  else
      data = Activites.get(oldState.id);
  let duration = Date.now() - data;
  if(oldState.channelID && !newState.channelID) { // Kanaldan Ayrılınca
      Activites.delete(oldState.id);
      if (oldState.channelID === await sunucuayarDB.get(`sunucuayar.sleep_kanal`)) return await sesdb.add(`sleep_room.${oldState.guild.id}.${oldState.id}.${await sunucuayarDB.get(`sunucuayar.sleep_kanal`)}`, duration);
      // GENEL
      await sesdb.add(`stats.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);
      await sesdb.add(`stats.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);

      // GÜNLÜK
      await stats_daily.add(`stats_daily.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);
      await stats_daily.add(`stats_daily.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);

      // HAFTALIK
      await stats_week.add(`stats_week.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);
      await stats_week.add(`stats_week.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);

      // 2 HAFTALIK
      await stats_two_week.add(`stats_two_week.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);
      await stats_two_week.add(`stats_two_week.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);

      // 3 HAFTALIK
      await stats_three_week.add(`stats_three_week.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);
      await stats_three_week.add(`stats_three_week.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);

      // 1 AY
      await stats_month.add(`stats_month.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);
      await stats_month.add(`stats_month.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);
  }
  else if(oldState.channelID && newState.channelID){ // Kanal değiştirince
        Activites.set(oldState.id, Date.now());
        if (newState.channelID === await sunucuayarDB.get(`sunucuayar.sleep_kanal`) || oldState.channelID === await sunucuayarDB.get(`sunucuayar.sleep_kanal`)) return await sesdb.add(`sleep_room.${oldState.guild.id}.${oldState.id}.${await sunucuayarDB.get(`sunucuayar.sleep_kanal`)}`, duration);
        // GENEL
      await sesdb.add(`stats.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);
      await sesdb.add(`stats.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);

      // GÜNLÜK
      await stats_daily.add(`stats_daily.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);
      await stats_daily.add(`stats_daily.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);

      // HAFTALIK
      await stats_week.add(`stats_week.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);
      await stats_week.add(`stats_week.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);

      // 2 HAFTALIK
      await stats_two_week.add(`stats_two_week.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);
      await stats_two_week.add(`stats_two_week.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);

      // 3 HAFTALIK
      await stats_three_week.add(`stats_three_week.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);
      await stats_three_week.add(`stats_three_week.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);

      // 1 AY
      await stats_month.add(`stats_month.${oldState.guild.id}.${oldState.id}.category.${oldState.channel.parentID}`, duration);
      await stats_month.add(`stats_month.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelID}`, duration);

  }
})

client.on("message", async (msg) => {
  let mstats_week = new qdb.table("mstats_week")
  let mstats_daily = new qdb.table("mstats_daily")
  let mstats_two_week = new qdb.table("mstats_two_week")
  let mstats_three_week = new qdb.table("mstats_three_week")
  let mstats_month = new qdb.table("mstats_month")
  if (!msg.guild || msg.author.id === client.user.id) return;
  if (msg.author.bot) return





  await sesdb.add(`message.${msg.guild.id}.${msg.author.id}.channels.${msg.channel.id}`, 1);
  await mstats_daily.add(`message_daily.${msg.guild.id}.${msg.author.id}.channels.${msg.channel.id}`, 1);
  await mstats_week.add(`message_week.${msg.guild.id}.${msg.author.id}.channels.${msg.channel.id}`, 1);
  await mstats_two_week.add(`message_two_week.${msg.guild.id}.${msg.author.id}.channels.${msg.channel.id}`, 1);
  await mstats_three_week.add(`message_three_week.${msg.guild.id}.${msg.author.id}.channels.${msg.channel.id}`, 1);
  await mstats_month.add(`message_month.${msg.guild.id}.${msg.author.id}.channels.${msg.channel.id}`, 1);

});
client.on("message", async message => {
  if (!message.guild || message.channel.type === "dm") return;
  let db = new qdb.table("ozelkomut")
  const prefixes = client.ayarlar.prefix;
  let prefix = prefixes.filter(p => message.content.startsWith(p))[0];

  if (!prefix) return;
  let ozelkomutlar = await db.get(`ozelkomut`);
  if (!ozelkomutlar) return;
  let yazilanKomut =  message.content.split(" ")[0];
  yazilanKomut = yazilanKomut.slice(prefix.length);
  var args = message.content.split(" ").slice(1);
  let komut = ozelkomutlar.find(x => x.isim.toLowerCase() === yazilanKomut);
  if (!komut) return;
  if (komut.tur === "rol") {
    let verilecekRol = message.guild.roles.cache.get(komut.verilecekRol);
    let yetki = message.guild.roles.cache.get(komut.yetkiliROL);
    if (!message.member.permissions.has("ADMINISTRATOR") && yetki && !message.guild.roles.cache.has(yetki.id))
      return message.reply(`Gerekli yetkili rolünü sunucuda bulamadım! Rol silinmiş olabilir, sunucu yetkililerine bildirmelisin!`);
    if (!verilecekRol) return message.reply(`Verilecek rolü sunucuda bulamadım! Rol silinmiş olabilir, sunucu yetkililerine bildirmelisin!`);
    if (!message.member.permissions.has("ADMINISTRATOR") && yetki !== "0" && !message.member.roles.cache.has(yetki.id))
      return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(client.user.username, client.user.avatarURL()).setDescription(`**Bu komutu kullanabilmek için ${yetki} rolüne sahip olmalısın!**`))
    let üye = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!üye)
      return message.reply(`\`${verilecekRol.name}\` rolünün verileceği/alınacağı üyeyi etiketlemelisin!`)
    üye.roles.cache.get(verilecekRol.id) ? üye.roles.remove(verilecekRol.id).then(a => message.channel.send(new Discord.MessageEmbed().setColor("BLACK").setDescription(`${üye} üyesinden ${verilecekRol} rolü alındı!`))) :
      üye.roles.add(verilecekRol.id).then(a => message.channel.send(new Discord.MessageEmbed().setColor("BLACK").setDescription(`${üye} üyesine ${verilecekRol} rolü verildi!`)))
    return;
  }
});

client.login(client.ayarlar.token).catch(err => console.log("Token bozulmuş lütfen yeni bir token girmeyi dene"));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




const sayiEmojiler = {
  0: `<a:owsla_sifir:780277947063468064>`, 
  1: `<a:owsla_bir:780277935810674748>`, 
  2: `<a:owsla_iki:780277898820976661>`, 
  3: `<a:owsla_uc:780277932630474802>`, 
  4: `<a:owsla_dort:780277894785794108>`, 
  5: `<a:owsla_bes:780277901755940895>`, 
  6: `<a:owsla_alti:780277924166500352>`, 
  7: `<a:owsla_yedi:780277954043314177>`, 
  8: `<a:owsla_sekiz:780277941455945729>`, 
  9: `<a:owsla_dokuz:780277951500648498>` 
};

client.emojiSayi = function(sayi) {
  var yeniMetin = "";
  var arr = Array.from(sayi)
  for(var x = 0; x < arr.length; x++) {
    yeniMetin += sayiEmojiler[arr[x]];
  };
  return yeniMetin;
};
  



  client.rastgeleSayi = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };



client.shuffle = function (arr) {
  var i,
      j,
      temp;
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }
  return arr;    
};

client.tarihHesapla = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);

  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;
  const secs = Math.floor(msecs / 1000);
  msecs -= secs * 1000;

  var string = "";
  if (years > 0) string += `${years} yıl ${months} ay`
  else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
  else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
  else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
  else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
  else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
  else if (secs > 0) string += `${secs} saniye`
  else string += `saniyeler`;

  string = string.trim();
  return `${string} önce`;
};
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
    format = "dd MM yyyy | hh:ii:ss";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};

Date.prototype.capslockk = function(s) {
  return (s) => {
    let x = s.toLowerCase();
    if (typeof x !== 'string')
      return '';
    return x.charAt(0).toUpperCase() + x.slice(1);
  };
}
function cezalandir(kisiID, tur) {
  client.guilds.cache.map(x => {
    let boosterRol = sunucuayarDB.get(`sunucuayar.booster_rol`)
    let jailRol = sunucuayarDB.get(`sunucuayar.jail_rol`)
    let uye = client.guilds.cache.get(x.id).members.cache.get(kisiID);
    if (!uye) return;
    if (tur == "jail") return uye.roles.cache.has(boosterRol) ? uye.roles.set([jailRol, boosterRol]) : uye.roles.set([jailRol]);
    if (tur == "ban") return uye.ban({ reason: "Owsla Koruma" }).catch();
  });
};

client.splitEmbedWithDesc = async function(description, author = false, footer = false, features = false) {
  let embedSize = parseInt(`${description.length/2048}`.split('.')[0])+1
  let embeds = new Array()
  for (var i = 0; i < embedSize; i++) {
    let desc = description.split("").splice(i*2048, (i+1)*2048)
    let x = new Discord.MessageEmbed().setDescription(desc.join(""))
    if (i == 0 && author) x.setAuthor(author.name, author.icon ? author.icon : null)
    if (i == embedSize-1 && footer) x.setFooter(footer.name, footer.icon ? footer.icon : null)
    if (i == embedSize-1 && features && features["setTimestamp"]) x.setTimestamp(features["setTimestamp"])
    if (features) {
      let keys = Object.keys(features)
      keys.forEach(key => {
        if (key == "setTimestamp") return
        let value = features[key]
        if (i !== 0 && key == 'setColor') x[key](value[0])
        else if (i == 0) {
          if(value.length == 2) x[key](value[0], value[1])
          else x[key](value[0])
        }
      })
    }
    embeds.push(x)
  }
  return embeds
};