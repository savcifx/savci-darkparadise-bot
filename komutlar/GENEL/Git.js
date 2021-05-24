const Discord = require("discord.js")
exports.run = async (client, message, args) => {
if (!message.guild) return;
    if (!message.member.voice.channel) return message.channel.send(`Bir ses kanalında olman gerek`)

    if (!message.mentions.members.first()) {
        return message.reply(`Bir kullanıcı etiketlemelisin`)
        }
    let kullanici = message.guild.members.cache.get(message.mentions.members.first().id)
    if (!kullanici.voice.channel) return message.channel.send("Bu Kullanıcı Bir Ses Kanalında Değil")
    if (message.member.voice.channel.id === kullanici.voice.channel.id) return message.channel.send("Zaten Aynı Kanaldasınız.")




    if (message.member.permissions.has("ADMINISTRATOR")) {
        message.member.voice.setChannel(kullanici.voice.channel)
    } else {
        const filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === kullanici.id;
        };
        let teklif = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${kullanici}, ${message.author} ${kullanici.voice.channel.name} Odasına Gelmek İstiyor. Kabul Ediyor Musun?`)
        let mesaj = await message.channel.send(teklif)
        await mesaj.react("✅")
        await mesaj.react("❌")
        mesaj.awaitReactions(filter, {
            max: 1,
            time: 1000 * 15,
            errors: ['time']
        }).then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === '✅') {
                let kabul = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`${message.author} Odaya Gittiniz`)
                mesaj.edit(kabul).then(x => x.delete({ timeout: 1000 }))
                message.member.voice.setChannel(kullanici.voice.channel)
            } else {
                let redd = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${kullanici} Odaya Gitme Teklifini **Reddetti.**`)
                mesaj.edit(redd).then(x => x.delete({ timeout: 1000 }))
            }
        })
    }








}


exports.conf = {

    enabled: true,
    aliases: ['git'],

};


exports.help = {
    name: "git",
    description: "Etiketlediğiniz kullanıcının yanına gidersiniz",
    usage: "git @etiket",
    kategori: 'Genel'
};
