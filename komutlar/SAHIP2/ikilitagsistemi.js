const Discord = require("discord.js")
const qdb = require("quick.db");
exports.run = async (client, message, args) => {
    if (!message.guild) return
    let db = new qdb.table("sunucuayar");
    let db2 = new qdb.table("prefix");
    let guvenliKisiDB = new qdb.table("guvenlikisi");
    
    let gkv = await guvenliKisiDB.get(`guvenlikisi`) || []
    if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {
        const prefix = await db2.get(`prefix`) || client.ayarlar.prefix
        const sec = args[0]
        if (sec === "aç" || sec === "aktif") {
            if (await db.get(`sunucuayar.tag2`)) {
                return message.reply("Sistem zaten aktif görünüyor")
            } else {
                if (!args[1]) return message.reply("Lütfen ``" + prefix[0] + "ikilitagsistemi aç <2.tag>`` şeklinde kullanınız")
                await db.set(`sunucuayar.tag2`, args[1])
                return message.reply("Başarılı bir şekilde ``" + args[1] + "`` sembolünü 2. Tagınız olarak tanımladınız")
            }
        } else if (sec === "kapat" || sec === "sıfırla") {
            if (!await db.get(`sunucuayar.tag2`)) {
                return message.reply("Bu komutu kullanabilmek için önce bir tag tanımlamalısın")
            } else {
                await db.delete(`sunucuayar.tag2`)
                return message.reply("Başarılı bir şekilde ikili tag sistemini sıfırladın")
            }
        } else {
            message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setImage("https://cdn.discordapp.com/attachments/659845938407407626/708919574975742013/uIfqEYq.gif").setDescription(`
**İkili Tag Sistemi Nedir ?**

Bazı sunucularda sunucuya girildiği takdirde ilk önce farklı bir tag(sembol) ardından giriş ve kayıt işlemi yapıldıktan sonra
farklı bir tag(sembol) olmaktadır bu sistemi bot kullanıcılarımızın isteği üzerine bizler de getirdik

\`${prefix[0]}ikilitagsistemi aç/kapat\` yazarak bu sistemi açabilir veya kapatabilirsiniz
`))
        }
    } else {
        return message.reply(
            "Bu komut sadece TAÇ sahibi tarafından kullanılabilir"
        );
    }
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ikili-tag-sistemi", "ikilitag-sistemi", "ikili-tagsistemi", "ikili-tag-sistemii"],
    permLevel: 0
};

exports.help = {
    name: 'ikilitagsistemi',
    description: "Sunucuda 2 adet tag kullanıyorsanız sistemi aktif edebilirsiniz",
    usage: 'ikilitagsistemi aç <2.tag> / ikilitagsistemi kapat',
    kategori: 'Sahip 2'
};