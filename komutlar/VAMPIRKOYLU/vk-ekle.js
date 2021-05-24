const qdb = require("quick.db");
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

		let kullanıcı = message.mentions.members.first()
		if (!kullanıcı) {
			message.reply('kullanıcı etiketlemelisin.')
		} else {
			if (!message.guild.members.cache.get(message.mentions.members.first().id).voice.channel) return message.reply(`Hata: Etiketlediğiniz kişi bir ses kanalında değil`)
			let vkekle = await db.get(`vk.oyunlar.${message.member.voice.channel.id}.durumlisted`)

			if (Object.keys(vkekle).find(x => x == kullanıcı.id)) {
				return message.reply("Bu kişi zaten ekli")
			} else {
				await db.set(`vk.oyunlar.${message.member.voice.channel.id}.roller.${kullanıcı.id}`, "Sonradan Eklendi")
				await db.set(`vk.oyunlar.${message.member.voice.channel.id}.durumlisted.${kullanıcı.id}`, "Sonradan Eklendi")
				message.channel.send("<@" + kullanıcı.id + '> adlı kullanıcıyı oyuna eklendi.')
			}


		}
	}
}
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 0,
}

exports.help = {
	name: 'vkekle',
	description: 'Vampir Köylü oyununa sonradan dahil olmak isteyen kullanıcıları eklemektedir',
	usage: 'vkekle @etiket',
  kategori: 'Vampir Koylu'
}
