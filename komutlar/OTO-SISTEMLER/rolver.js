const {MessageEmbed} = require('discord.js')
const qdb = require("quick.db");
const moment = require('moment');
moment.locale("tr");



exports.run = async (client, message, args) => {
  if (!message.guild) return
  let guvenliKisiDB = new qdb.table("guvenlikisi");
  let rolLog = new qdb.table("rollog");
  
  let gkv = guvenliKisiDB.get(`guvenlikisi`) || []
  if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID || message.member.permissions.has(8) ) {
    
    let sec = args[0]
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
    let data = await rolLog.get(`rollog.${message.author.id}`)
    if (sec === "ver") {
        if (!target) return message.reply("Lütfen bir üye belirtiniz!");
        if (!role) return message.reply("Lütfen vermek istediğiniz rolü etiketleyiniz veya ID'sini yazınız")
        let roller = await rolLog.get("yasakli_roller")
        if (role.id === roller) return message.reply("Bu komut yasaklı roller listesinde lütfen geçerli rolleri kullanınız!")
        if (target.roles.cache.get(role.id)) return message.reply("Bu rol zaten bu kullanıcıda var") 

        let obj = {Tur: "[EKLENDİ]", Member: target.id, Zaman: Date.now(), VerilenRol: role.id}

        await rolLog.push(`rollog.${message.author.id}`, {Type: "[EKLENDİ]", Member: target.id, Zaman: Date.now(), Role: role.id})

        message.channel.send(`${message.author} adlı yetkili ${target} adlı üyeye ${role} rolünü verdi`)
        target.roles.add(role)

    }

    if (sec === "al") {
        if (!target) return message.reply("Lütfen bir üye belirtiniz!");
        if (!role) return message.reply("Lütfen vermek istediğiniz rolü etiketleyiniz veya ID'sini yazınız")
        if (!message.guild.members.cache.get(target.id).roles.cache.get(role.id)) return message.reply("Bu rol zaten bu kullanıcıda yoktur") 
        let roller = await rolLog.get("yasakli_roller")
        if (role.id === roller) return message.reply("Bu komut yasaklı roller listesinde lütfen geçerli rolleri kullanınız!")

        await rolLog.push(`rollog.${message.author.id}`, {Type: "[ALINDI]", Member: target.id, Zaman: Date.now(), Role: role.id})

        message.channel.send(`${message.author} adlı yetkili ${target} adlı üyeden ${role} rolünü aldı`)
        target.roles.remove(role)
    }
    if (sec === "yasaklı") {
      if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {
        if (!role) return message.reply("Lütfen yasaklamak istediğiniz rolü etiketleyiniz veya ID'sini giriniz!");

        await rolLog.set("yasakli_roller", role.id);
  
        return message.reply("Başarılı bir şekilde " + role + " adlı rolü yasaklı roller listesine ekledin!")
      } else return message.reply("Bu komutu sadece GK kullanıcıları kullanabilir.");
    } 


    if (sec == "bilgi") {

let data = await rolLog.get(`rollog.${target.id}`)
data = data.reverse();
let komutlar = data ? data.map(kmt => `\`[${moment(kmt.Zaman).format('LLL')}]\`\n${kmt.Type.replace("[EKLENDİ]", `**[++]**`).replace("[ALINDI]", `**[--]**`)} (<@${kmt.Member}>) (<@&${kmt.Role}>)`) : ["\`\`\`Datacenter'da kaydedilen bir veri görüntülenemedi\`\`\`"];
/*let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag).setDescription(`
${target} (<@&${target.roles.highest.id}>) rol verme/alma logları

${komutlar}

Örnek kullanım:
\`d!rol ver @Owsla#0001 @Rol/ID\`
\`d!rol al @Owsla#0001 @Rol/ID\`
${message.author.id == message.guild.owner.id ? `
\`d!rol bilgi @Owsla#0001\`` : ""}
`);
return message.channel.send(embed);
*/

const emojis = komutlar

		// Define our function.
		async function list(listMsg, page, increment) {
		  const entries = Object.entries(emojis);
		
		  // Set up base embed.
		  var embed = new MessageEmbed()
			.setColor(1056085)
            .setAuthor(client.users.cache.get(target.id).username, message.guild.members.cache.get(target.id).user.displayAvatarURL()) // YYYYMMDD
            .setDescription(`${target} (<@&${target.roles.highest.id}>) istatistikleri\n`)
			.setFooter(`Sayfa ${page}/${Math.ceil(entries.length/increment)}`)
			.setTimestamp(listMsg ? listMsg.createdAt : undefined);
		
		  // Add fields to embed.
		
		  const stringField = [];
		
		  for (let [emoji, string] of entries.slice((page - 1) * increment, (page * increment))) {
		
			stringField.push(string);
		  }
		
		  embed.addField(`Rol \`Verme/Alma\` Kayıtları`,stringField.join('\n'), true);
		
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
		list(undefined, 1, 10)
		  .catch(console.error);   
}



    if (!sec) return message.channel.send(`Komut kullan`)


  } else {
    return message.reply(
      "Bu komut sadece TAÇ sahibi tarafından kullanılabilir"
    );
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["r"],
  permLevel: 0
};

exports.help = {
  name: 'rol',
  description: 'Sunucuya girip çıkanları sayaç halinde belirtilen kanala gönderir.',
  usage: 'sayaç <sayı> <#kanal>/sıfırla',
  kategori: 'Sahip'
};
function removeItemOnce(arr, value) { var index = arr.indexOf(value); if (index > -1) { arr.splice(index, 1); } return arr; }
