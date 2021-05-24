const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.guild) return
  if (client.ayarlar.yapimci.some(x => x !== message.author.id)) return
  let guild = message.guild;
	if(args[0] === "kur" || args[0] === "kurulum") {
    let onay = "https://cdn.discordapp.com/emojis/673576575760990227.gif?v=1";
    let onay2 = "https://cdn.discordapp.com/emojis/673576252241608714.gif?v=1";
    let iptal = "https://cdn.discordapp.com/emojis/673576480487506011.gif?v=1";
    let bosta = "https://cdn.discordapp.com/emojis/673576453140512788.png?v=1";
    let rahatsizetmeyin = "https://cdn.discordapp.com/emojis/673576231433797664.png?v=1";
    let gorunmez = "https://cdn.discordapp.com/emojis/673576417224556611.png?v=1";
    let cevrimici = "https://cdn.discordapp.com/emojis/673576292205068314.png?v=1";
    let mavibit = "https://cdn.discordapp.com/emojis/673574012235939850.gif?v=1";
    let sayı0 = "https://cdn.discordapp.com/emojis/672098218905174016.gif?v=1";
    let sayı1 = "https://cdn.discordapp.com/emojis/672098250676895744.gif?v=1";
    let sayı2 = "https://cdn.discordapp.com/emojis/672098365252829205.gif?v=1";
    let sayı3 = "https://cdn.discordapp.com/emojis/672098398916182016.gif?v=1";
    let sayı4 = "https://cdn.discordapp.com/emojis/672098440519614474.gif?v=1";
    let sayı5 = "https://cdn.discordapp.com/emojis/672098501752258570.gif?v=1";
    let sayı6 = "https://cdn.discordapp.com/emojis/672098534463373332.gif?v=1";
    let sayı7 = "https://cdn.discordapp.com/emojis/672098564897374218.gif?v=1";
    let sayı8 = "https://cdn.discordapp.com/emojis/672098613668872218.gif?v=1";
    let sayı9 = "https://cdn.discordapp.com/emojis/672098648523538433.gif?v=1";
    let deafned = "https://cdn.discordapp.com/attachments/751763571540492350/779047760648601610/deafned.png";
    let undeafned = "https://cdn.discordapp.com/attachments/751763571540492350/779047766642393138/undeafned.png";
    let kapali = "https://cdn.discordapp.com/attachments/751763571540492350/779047763417628682/kapali.png";
    let acik = "https://cdn.discordapp.com/attachments/751763571540492350/779047775538511906/acik.png";
    let muted = "https://cdn.discordapp.com/attachments/751763571540492350/779047764083474452/muted.png"
    let unmuted = "https://cdn.discordapp.com/attachments/751763571540492350/779047770635763778/unmuted.png"
    let sag = "https://cdn.discordapp.com/attachments/751763571540492350/779047767161962506/sag.gif"
    
    message.guild.emojis.create(onay, "owsla_onay").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(onay2, "owsla_tik").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(iptal, "owsla_iptal").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(bosta, "owsla_away").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(rahatsizetmeyin, "owsla_dnd").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(gorunmez, "owsla_offline").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(cevrimici, "owsla_online").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(sayı0, "owsla_sifir").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(sayı1, "owsla_bir").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(sayı2, "owsla_iki").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(sayı3, "owsla_uc").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(sayı4, "owsla_dort").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(sayı5, "owsla_bes").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(sayı6, "owsla_alti").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(sayı7, "owsla_yedi").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(sayı8, "owsla_sekiz").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(sayı9, "owsla_dokuz").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(deafned, "owsla_deafned").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(undeafned, "owsla_undeafned").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(kapali, "owsla_kapali").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(acik, "owsla_acik").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(muted, "owsla_muted").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(unmuted, "owsla_unmuted").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    message.guild.emojis.create(sag, "owsla_sag").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    return;
  };
  
  if(args[0] === "oluştur" || args[0] === "ekle") {
    let [link, ad] = args.slice(1).join(" ").split(" ");
    if (!link) return message.channel.send(`Bir link yazmalısın. Doğru kullanım: **${this.configuration.name} oluştur <link> <isim>**`);
    if (!ad) return message.channel.send(`Bir isim yazmalısın. Doğru kullanım: **${this.configuration.name} oluştur <link> <isim>**`);
  
    message.guild.emojis.create(link, ad)
      .then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`))
      .catch(console.error);
    return;
  };
  
  
  
  if(args[0] === "id") {
    try {
      message.channel.send(`Sunucuda Bulunan Emojiler (${message.guild.emojis.cache.size} adet) \n\n${message.guild.emojis.cache.map(emoji => emoji.id + " | " + emoji.toString()).join('\n')}`, {code: 'xl', split: true})
    } catch (err) { };
    return
  };
  
  if (message.guild.emojis.cache.some(x => `${x.name}`.includes(args[0]))) {
    if (!message.guild.emojis.cache.some(x => `${x.name}`.includes(args[0]))) return message.channel.send(`Sunucuda  \`${args[0]}\`  adında bir emoji bulunamadı!`);
    const emoji = new MessageEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
    .setDescription(`**Emoji:**  ${message.guild.emojis.cache.find(a => a.name === args[0])} \n**Emoji Adı:**  ${message.guild.emojis.cache.find(a => a.name === args[0]).name} \n**Emoji ID'si:**  ${message.guild.emojis.cache.find(a => a.name === args[0]).id} \n**Emoji Kodu:**  \`${message.guild.emojis.cache.find(x => x.name == args[0]).toString()}\``);
    try {
      message.channel.send(emoji)
    } catch (err) {
      const embed = new MessageEmbed()
      .addField(`Sunucuda Bulunan Emojiler`, `Üzgünüm ama sunucuda ya çok fazla emoji bulunuyor ya da hiç emoji bulunmuyor. Bunları gösteremiyorum. Discord buna izin vermiyor.`)
      .setColor(0x00ffff)
      .setTimestamp()
      message.channel.send({embed})
    };
    return;
  };
  
  try {
    const embed = new MessageEmbed()
    .addField(`Sunucuda Bulunan Emojiler`, message.guild.emojis.cache.map(emoji => emoji).join(' | '))
    .setColor(0x00ffff)
    .setTimestamp()
    .setFooter('Emojileri IDleri ile birlikte görmek için; emojiler id')
    message.channel.send({embed})
  } catch (err) {
    const embed = new MessageEmbed()
    .addField(`Sunucuda Bulunan Emojiler`, `Üzgünüm ama sunucuda ya çok fazla emoji bulunuyor ya da hiç emoji bulunmuyor. Bunları gösteremiyorum. Discord buna izin vermiyor.`)
    .setFooter('Emojilere bakamıyor ve IDleri ile birlikte görmek isterseniz; emojiler id')
    .setColor(0x00ffff)
    .setTimestamp()
    message.channel.send({embed})
  };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['emojis'],
    permLevel: 4
  };
  
  exports.help = {
    name: 'emoji',
    description: "Sunucuda komut denemeye yarar",
    usage: 'eval <kod>',
    kategori: "Bot Yapımcısı"
  };
  