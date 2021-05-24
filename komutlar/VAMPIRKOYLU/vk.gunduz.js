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
    if (!message.member.voice.channel) return message.reply(`Hata: Bu komutu kullanabilmek için bir ses kanalında olmanız gerekiyor`)
	let vkdurum = await db.get(`vkdurum.${message.member.voice.channel.id}`)
if (!vkdurum) {
		return message.channel.send(`${message.author}, Lütfen bir oyun başlatınız  (\`${prefix[0]}vkroller\`) yazmalısın!`)
	} else {

        let seslidekiler = await db.get(`vk.oyunlar.${message.member.voice.channel.id}.durumlisted`)
        let oluler = await db.get(`vk.oyunlar.${message.member.voice.channel.id}.oluler`) || []
        if (!Array.isArray(await db.get(`vk.oyunlar.${message.member.voice.channel.id}.oluler`)))
        await db.set(`vk.oyunlar.${message.member.voice.channel.id}.oluler`, [])


        Object.keys(seslidekiler).forEach(async (id, index) => {
            setTimeout(async () => {
                await oluler.map(x => message.guild.members.cache.get(x).voice.setMute(true))
                await message.guild.members.cache.get(id).voice.setMute(false)
            }, index * 1000)
            })


        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.nickname || message.author.tag, message.author.avatarURL())
            .setDescription('Başarıyla oyun modu sabah olarak ayarlandı!')
            .setColor('RANDOM')
        message.channel.send({embed: embed})
        await db.set(`vk.lobi.${message.member.voice.channel.id}.Zaman`, "Gündüz")
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
}

exports.help = {
    name: 'vkgündüz',
    description: 'Vampir Köylü oyununda oyun durumunu gündüz yapmaya yaramaktadır',
    usage: 'vkgündüz',
    kategori: 'Vampir Koylu'
}
