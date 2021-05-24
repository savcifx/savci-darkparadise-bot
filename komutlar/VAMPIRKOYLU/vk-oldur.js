const Discord = require("discord.js");
const qdb = require("quick.db");
exports.run = async (client, message, args) => {
	if (!message.guild) return
	let db2 = new qdb.table("prefix");
	let db3 = new qdb.table("sunucuayar");
	let db = new qdb.table("vampirkoylu")
	
	let prefix = await db2.get(`prefix`) || client.ayarlar.prefix
	const vkyonetici = await db3.get(`sunucuayar.vkyonetici`)
	if (!message.member.roles.cache.has(vkyonetici)) return message.channel.send("Oyun Yöneticisi Değilsin.")



	let vkdurum = await db.get(`vkdurum.${message.member.voice.channel.id}`)
if (!vkdurum) {
		return message.channel.send(`${message.author}, Lütfen bir oyun başlatınız  (\`${prefix[0]}vkroller\`) yazmalısın!`)
	} else {

		let kullanıcı = message.mentions.users.first();
		if (!kullanıcı) {
			
			message.channel.send('<@' + message.author.id + '>, bir kişiyi etiketlemen gerek.')
		} else {
			if (!message.guild.members.cache.get(message.mentions.members.first().id).voice.channel) return message.reply(`Hata: Etiketlediğiniz kişi bir ses kanalında değil`)
			let oluler = await db.get(`vk.oyunlar.${message.member.voice.channel.id}.oluler`) || []
			let durum = await db.get(`vk.oyunlar.${message.member.voice.channel.id}.durumlisted`)
			if (!Array.isArray(db.get(`vk.oyunlar.${message.member.voice.channel.id}.oluler`)))
			await db.set(`vk.oyunlar.${message.member.voice.channel.id}.oluler`, [])
			if (oluler.find(x => x == kullanıcı.id)) return message.reply("Zaten ölü")
			await db.push(`vk.oyunlar.${message.member.voice.channel.id}.oluler`, kullanıcı.id)
			await db.delete(`vk.oyunlar.${message.member.voice.channel.id}.durumlisted.${kullanıcı.id}`)

			

			const embed = new Discord.MessageEmbed()
				.setAuthor(message.author.username, message.author.avatarURL())
				.setColor('RANDOM')
				.setDescription(`${kullanıcı} öldürüldü.

• Hayatta: ${(Object.keys(durum).length) - 1}
• Ölü: ${oluler.length + 1}
`)
			message.channel.send({
				embed: embed
			})
		}

	}

}
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["vkoldur"],
	permLevel: 0,
}

exports.help = {
	name: 'vköldür',
	description: 'Vampir Köylü oyununda Tehlikeli Roller tarafından öldürülen kullanıcıları oyundan silmeye yaramaktadır',
	usage: 'vköldür @etiket',
	kategori: 'Vampir Koylu'
}