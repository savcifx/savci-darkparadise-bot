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

            let vklobi = await db.get(`vk.lobi.${message.member.voice.channel.id}`)

            let gercekdurum = await db.get(`vk.oyunlar.${message.member.voice.channel.id}.roller`)

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.nickname || message.author.tag, message.author.avatarURL())
            .setColor('RANDOM')
            .setDescription(`
\`#${vklobi.LobiID + 1 || 0}\` adlı oyunumuz bitti, bir sonraki oyun da görüşmek üzere
Biten oyunun rolleri:

${Object.keys(gercekdurum).map(x => `<@${x}> [\`${capitalize(gercekdurum[x])}\`]`).join("\n")}
`)



        message.channel.send({embed: embed}).then(async () => {
            await db.delete(`vkstart.${message.member.voice.channel.id}`)
            await db.delete(`vkdurum.${message.member.voice.channel.id}`)
            //
            await db.delete(`vk.lobi.${message.member.voice.channel.id}.Zaman`)
            await db.delete(`vk.lobi.${message.member.voice.channel.id}.Date`)
            await db.delete(`vk.lobi.${message.member.voice.channel.id}.Author`)
            //
            await db.delete(`vk.oyunlar.${message.member.voice.channel.id}.roller`)
            await db.delete(`vk.oyunlar.${message.member.voice.channel.id}.durumlisted`)
            await db.delete(`vk.oyunlar.${message.member.voice.channel.id}.oluler`)
        })
    }


}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["vkson", "vkstop", "vkbitti"],
    permLevel: 0,
}

exports.help = {
    name: 'vkbitir',
    description: 'Vampir köylü oyununu bitirmeye yaramaktadır',
    usage: 'vkbitir',
    kategori: 'Vampir Koylu'
}
function capitalize (s) {
	let x = s.toLowerCase();
	if (typeof x !== 'string') return ''
	return x.charAt(0).toUpperCase() + x.slice(1)
}