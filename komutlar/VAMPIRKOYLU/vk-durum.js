const Discord = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
exports.run = async (client, message, args) => {
	if (!message.guild) return
	let db2 = new qdb.table("prefix");
	let db3 = new qdb.table("sunucuayar");
	let db = new qdb.table("vampirkoylu")
	let prefix = await db2.get(`prefix`) || client.ayarlar.prefix
	const vkyonetici = await db3.get(`sunucuayar.vkyonetici`)
	if (!message.member.roles.cache.has(vkyonetici)) return message.channel.send("Oyun Yöneticisi Değilsin.")
	if (!message.member.voice.channel) return message.reply(`Hata: Bu komutu kullanabilmek için bir ses kanalında olmanız gerekiyor`)
	let vkdurum = await db.get(`vkdurum.${message.member.voice.channel.id}`)
	if (!vkdurum) {
			return message.channel.send(`${message.author}, Lütfen bir oyun başlatınız  (\`${prefix[0]}vkroller\`) yazmalısın!`)
		} else {
let vklobi = await db.get(`vk.lobi.${message.member.voice.channel.id}`)
let gercekdurum = await db.get(`vk.oyunlar.${message.member.voice.channel.id}.roller`)
let durum = await db.get(`vk.oyunlar.${message.member.voice.channel.id}.durumlisted`)
shuffle(durum)
shuffle(durum)
let oluler = await db.get(`vk.oyunlar.${message.member.voice.channel.id}.oluler`) || []
		
		const embed = new Discord.MessageEmbed()
			.setAuthor(message.author.username, message.author.avatarURL())
			.setColor('RANDOM')
			.setFooter(client.ayarlar.footer)
			.setDescription(`
─────────────────────
**• Oyun Yöneticisi:** <@${vklobi.Author}>
**• Oyun Durumu:** \`${vklobi.Zaman}\`
**• Oyun Başlatılma:** (\`${moment(vklobi.Date).format("DD:MM:YYYY - HH:mm:ss")}\`)
**• Başlatılan Oyuncu Sayısı:** ${Object.keys(gercekdurum).length}
─────────────────────
**• Hayattaki Oyuncular:** (${Object.keys(durum).length})
${Object.keys(durum).map(x => `<@${x}>`).join("\n")}
─────────────────────
**• Ölü Oyuncular:** (\`${oluler.length}\`)
${oluler.map(x => `<@${x}>`)}
─────────────────────
`)
		message.channel.send(embed)

	}
	
}
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 0,
}

exports.help = {
	name: 'vkdurum',
	description: 'Vampir Köylü oyununun oyun gidişatını görüntülemeye yaramaktadır',
	usage: 'vkdurum',
	kategori: 'Vampir Koylu'
}
const capitalize = (s) => {
	let x = s.toLowerCase();
	if (typeof x !== 'string') return ''
	return x.charAt(0).toUpperCase() + x.slice(1)
}
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
	  let j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
  }
