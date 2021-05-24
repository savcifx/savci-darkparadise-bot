const {
    MessageEmbed
} = require('discord.js');
const qdb = require("quick.db");
const ms = require("ms");
const moment = require("moment");


exports.run = async (client, message, args) => {
    if (!message.guild) return
    let rolAyarlarDB = new qdb.table("rolayarlar");
    let profilDB = new qdb.table("profil");
    let sunucuAyarDB = new qdb.table("sunucuayar")

    let arr = await rolAyarlarDB.get(`rolayarlar.vmute_sorumlusu`) || []
    let arr2 = await rolAyarlarDB.get(`rolayarlar.vmute_users`) || ["751524861205282969"]
    if (message.member.permissions.has(8) || message.member.permissions.has("MUTE_MEMBERS") || message.member.roles.cache.some(e => arr.some(x => x == e)) || message.members.cache.some(e => arr2.some(x => x == e))) {

        let target = message.mentions.members.first();
        if (!target) return message.reply("Lütfen bir kişi etiketleyiniz!")
        let mute = await sunucuAyarDB.get(`sunucuayar.voice_muted_rol`);
        if (!mute) return message.reply("Bu komutun kullanılabilmesi için Muted Rolünün tanımlanması gerekiyor! ``" + prefix[0] + "kurulum voicemuted @voicemutedrol`` şeklinde kurabilirsiniz")
        
        let voiceMute = message.guild.channels.cache.get(await rolAyarlarDB.get(`rolayarlar.voice_mute_kanal`));
        let zaman = moment(Date.now()).format('DD.MM.YYYY - HH:MM')



        if (!voiceMute) {
            if (target.roles.cache.has(mute)) {
                //DATABASE BAŞLANGIÇ
                database(target, profilDB); // çık gir yapınca tekrar verme
                //* DATA BİTİŞ
                await target.roles.remove(mute);
                return message.channel.send(`Başarılı bir şekilde <@${target.id}> adlı üyenin susturulmasını kaldırdınız`)
            }
            message.channel.send(`<@${message.author.id}>, Etiketlediğiniz üye zaten susturulmamış olarak görünmektedir!`)
        } else {
            if (target.roles.cache.has(mute)) {
                //DATABASE BAŞLANGIÇ
                database(target, profilDB); // çık gir yapınca tekrar verme
                //* DATA BİTİŞ
                await target.roles.remove(mute);
                client.channels.cache.get(voiceMute.id).send(new MessageEmbed().setColor("RANDOM").setTimestamp().setFooter(client.ayarlar.footer).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`[\`${zaman}\`] Başarılı bir şekilde <@${target.id}> adlı üyenin susturulması kaldırıldı! (Yetkili: ${message.author})`))
                return message.channel.send(new MessageEmbed().setColor("RANDOM").setTimestamp().setFooter(client.ayarlar.footer).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`${message.author} Başarılı bir şekilde <@${target.id}> adlı üyenin susturulmasını kaldırdınız`));
            }
            message.channel.send(`<@${message.author.id}>, Etiketlediğiniz üye zaten susturulmamış olarak görünmektedir!`);
        }

    } else {
        return message.reply("Bu komutu kullanabilmek için **Yönetici** - **Mute Sorumlusu** ya da **Üyeleri Sustur** iznine sahip olmanız gerekmektedir!")
    }





};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'unsesmute',
    description: 'Etiketlenen kullanıcıya belirli miktarda mute cezası vermektedir',
    usage: 'unsesmute [etiket]',
    kategori: 'Moderasyon'
};

async function database(target, profilDB) {
    let uyari = await profilDB.get(`profil.${target.id}.uyari`);
    if (!await profilDB.get(`profil.${target.id}.uyari`))
        uyari = await profilDB.set(`profil.${target.id}.uyari`, {
            Mute: false,
            Jail: false,
            Voice_Mute: false,
            Uyari_Miktar: 0,
            Uyari_Son_Miktar: 3
        });
    uyari.Voice_Mute = false;
    await profilDB.set(`profil.${target.id}.uyari`, uyari);
}