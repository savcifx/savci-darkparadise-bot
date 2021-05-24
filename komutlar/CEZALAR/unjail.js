const {
    MessageEmbed
} = require('discord.js');
const qdb = require("quick.db");
const ms = require("ms");
const moment = require("moment");


exports.run = async (client, message, args) => {
    if (!message.guild) return
    let rolAyarlarDB = new qdb.table("rolayarlar");
    let sunucuAyarDB = new qdb.table("sunucuayar");
    let profilDB = new qdb.table("profil");

    let arr = await rolAyarlarDB.get(`rolayarlar.jail_sorumlusu`) || []
    let arr2 = await rolAyarlarDB.get(`rolayarlar.jail_users`) || ["751524861205282969"]
    if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e)) || message.members.cache.some(e => arr2.some(x => x == e))) {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply("Lütfen bir kişi etiketleyiniz!")
        let jail = await sunucuAyarDB.get(`sunucuayar.jail_rol`);
        if (!jail) return message.reply("Bu komutun kullanılabilmesi için Jail Rolünün tanımlanması gerekiyor! ``" + prefix[0] + "kurulum jail @jailrol`` şeklinde kurabilirsiniz")
        let kayitsizUye = await sunucuAyarDB.get(`sunucuayar.kayitsiz_uye`)
        if (!kayitsizUye) return message.reply("Bu komutun kullanılabilmesi için Oto Rolünün tanımlanması gerekiyor! ``" + prefix[0] + "otorol #kanal @rol`` şeklinde kurabilirsiniz")
        let boosterRol = await sunucuAyarDB.get(`sunucuayar.booster_rol`)
        if (!boosterRol) return message.reply("Bu komutun kullanılabilmesi için Booster Rolünün tanımlanması gerekiyor! ``" + prefix[0] + "kurulum booster @boosterrol`` şeklinde kurabilirsiniz")
        
        let jailLogChannel = message.guild.channels.cache.get(rolAyarlarDB.get(`rolayarlar.jail_kanal`));
        let zaman = moment(Date.now()).format('DD.MM.YYYY - HH:MM')




        if (!jailLogChannel) {
            if (target.roles.cache.has(jail)) {
                //DATABASE BAŞLANGIÇ
                await database(target, profilDB); // çık gir yapınca tekrar verme
                //* DATA BİTİŞ
                if (target.roles.cache.has(boosterRol)) {
                    message.guild.members.cache.get(target.id).roles.set([boosterRol]).catch(() => { });
                  }
                  message.guild.members.cache.get(target.id).roles.set(kayitsizUye).catch(() => { });
                return message.channel.send(`Başarılı bir şekilde <@${target.id}> adlı üyenin jailini kaldırdınız`)
            }
            message.channel.send(`<@${message.author.id}>, Etiketlediğiniz üye zaten cezasız görünmekte!`)
        } else {
            if (target.roles.cache.has(jail)) {
                //DATABASE BAŞLANGIÇ
                await database(target, profilDB); // çık gir yapınca tekrar verme
                //* DATA BİTİŞ
                if (target.roles.cache.has(boosterRol)) {
                    message.guild.members.cache.get(target.id).roles.set([boosterRol]).catch(() => { });
                  }
                  message.guild.members.cache.get(target.id).roles.set(kayitsizUye).catch(() => { });
                client.channels.cache.get(jailLogChannel.id).send(new MessageEmbed().setColor("RANDOM").setTimestamp().setFooter(client.ayarlar.footer).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`[\`${zaman}\`] Başarılı bir şekilde <@${target.id}> adlı üyenin jaili kaldırıldı! (Yetkili: ${message.author})`))
                return message.channel.send(new MessageEmbed().setColor("RANDOM").setTimestamp().setFooter(client.ayarlar.footer).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`${message.author} Başarılı bir şekilde <@${target.id}> adlı üyenin jailini kaldırdınız`));
            }
            message.channel.send(`<@${message.author.id}>, Etiketlediğiniz üye zaten cezasız görünmekte!`);
        }

    } else {
        return message.reply("Bu komutu kullanabilmek için **Yönetici** ya da **Jail Sorumlusu** iznine sahip olmanız gerekmektedir!")
    }





};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cezakaldır"],
    permLevel: 0
};

exports.help = {
    name: 'unjail',
    description: 'Etiketlenen kullanıcıya belirli miktarda mute cezası vermektedir',
    usage: 'unjail [etiket]',
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
    uyari.Jail = false;
    await profilDB.set(`profil.${target.id}.uyari`, uyari);
}