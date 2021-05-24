const Discord = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
exports.run = async function (client, message, args) {
	if (!message.guild) return
	let db = new qdb.table("sunucuayar");
	let db2 = new qdb.table("prefix");
	let db3 = new qdb.table("vampirkoylu")

	const prefix = await db2.get(`prefix`) || client.ayarlar.prefix
	const vkyonetici = await db.get(`sunucuayar.vkyonetici`);
	if (!message.member.roles.cache.has(vkyonetici) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply("Yönetici ya da VK Sorumlusu olman gerekiyor!")
	if (!message.member.voice.channel) return message.reply(`Hata: Bu komutu kullanabilmek için bir ses kanalında olmanız gerekiyor`)
	let vklobi = await db3.get(`vkstart.${message.member.voice.channel.id}`)
	if(vklobi == "Aktif") {
		return message.channel.send(`${message.author}, Şuan da zaten bir oyun oynanıyor oyunu bitirmek için (\`${prefix[0]}vkbitir\`) yazmalısın!`);
	} else {
		let sestekiUyeler = message.member.voice.channel.members.filter(member => !member.voice.serverDeaf && message.member.id != member.id).array();
		if(sestekiUyeler.length < 5) return message.channel.send("Bu oyunun başlayabilmesi için 5'den fazla üye olması gerekiyor!");

		await db3.set(`vk.lobi.${message.member.voice.channel.id}.Zaman`, "Gündüz")
		await db3.set(`vk.lobi.${message.member.voice.channel.id}.Date`, Date.now())
		await db3.set(`vk.lobi.${message.member.voice.channel.id}.Author`, message.author.id)
		await db3.add(`vk.lobi.${message.member.voice.channel.id}.LobiID`, 1)
		await db3.set(`vkstart.${message.member.voice.channel.id}`, "Aktif")
		message.channel.send(`\`#${await db3.get(`vk.lobi.${message.member.voice.channel.id}.LobiID`) + 1}\` numaralı **Vampir Köylü** oyunu \`${moment(Date.now()).format("DD/MM/YYYY - HH:mm:ss")}\` tarihinde <@${message.author.id}> (\`${message.author.id}\`) tarafından başlatıldı!`)
	
	}


}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["vkbasla", "vkbaşla"],
	permLevel: 0,
}

exports.help = {
	name: 'vkstart',
	description: 'Vampir köylü oyununu başlatmaya yaramaktadır',
	usage: 'vkroller',
	kategori: 'Vampir Koylu'
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
	  let j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
  }

function capitalize (s) {
	let x = s.toLowerCase();
	if (typeof x !== 'string') return ''
	return x.charAt(0).toUpperCase() + x.slice(1)
}

function lengthByArray(arr, result = {}){
	arr.forEach(e => result[e] ? result[e]++ : result[e] = 1);
	return result;
  }