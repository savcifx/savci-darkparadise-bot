const Discord = require("discord.js")

const qdb = require("quick.db");

exports.run = async (client, message, args) => {
    if (!message.guild) return

    let db = new qdb.table("sunucuayar");
    let db2 = new qdb.table("prefix");
    let guvenliKisiDB = new qdb.table("guvenlikisi");
    
    let gkv = await guvenliKisiDB.get(`guvenlikisi`) || []

    if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {
        const sec = args[0]
        const sec2 = args[1]
        const prefix = await db2.get(`prefix`) || client.ayarlar.prefix
        if (sec === "ekle") {
            var veri = await db.get(`sunucuayar.yasaklitaglar`) || [];
            if (!await db.get(`sunucuayar.yasaklitaglar`))
                veri = await db.set(`sunucuayar.yasaklitaglar`, []);
            if (sec2) {
                if (veri.includes(args[1])) {
                    return message.reply(`Hata: Girmiş olduğunuz \`${args[1]}\` tagı sunucunuzda zaten yasaklı taglar listesinde!`)
                } else {

                    await db.push(`sunucuayar.yasaklitaglar`, args[1])
                    message.channel.send(`Başarılı bir şekilde ${args[1]} tagını yasaklı taglar listesine eklediniz! Bu Tagdaki Üye Sayısı: ${message.guild.members.cache.filter(u => u.user.username.includes(args[1])).size}`)
                    
                }
            } else {
                return message.reply(`**Hata:** Yasaklı tag ekleyebilmek için bir tag girmelisiniz!`)
            }
        }

        //////////////////////////////////////////////////////////////////////////

        if (sec === "sil") {
            var veri = await db.get(`sunucuayar.yasaklitaglar`) || [];
            if (!await db.get(`sunucuayar.yasaklitaglar`))
                veri = await db.set(`sunucuayar.yasaklitaglar`, []);

            if (sec2) {
                if (veri.includes(args[1])) { //
                    var arr = veri
                    
                    removeItemOnce(arr, args[1])
                    await db.set(`sunucuayar.yasaklitaglar`, arr);


                    let tagsalan = message.guild.members.cache.filter(x => x.roles.cache.get(db.get(`sunucuayar.yasaklitag_rol`)) && x.user.username.includes(args[1]))
                    
                    tagsalan.array().forEach(async (user, index) => {
                        setTimeout(async () => {
                        await user.roles.set(await db.get(`sunucuayar.kayitsiz_uye`)).catch(() => {})
                    }, index * 500)
                    })

                    return message.reply("Başarılı bir şekilde `" + args[1] + "` adlı tag silindi Bu tag'da bulunan `" + tagsalan.size + "` üye kayıtsız rolüne aktarıldı!")
                } else {

                    message.channel.send(`Bu tag zaten yok`)
                }
            } else {
                return message.reply("Lütfen bir tag giriniz")
            }
        }


        if (!sec) {
            let veri = await db.get(`sunucuayar.yasaklitaglar`);
            if (!await db.get(`sunucuayar.yasaklitaglar`))
                veri = await db.set(`sunucuayar.yasaklitaglar`, []);
            message.channel.send(new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(`
**Yasaklı Tag Eklemek/Silmek İçin**

**${prefix[0]}yasaklıtag ekle <tag>** \`|\` **${prefix[0]}yasaklıtag sil <tag>**

**YASAKLI TAGLAR**
${veri.map(x => {
    return {
        Id: x,
        Total: message.guild.members.cache.filter(u => u.user.username.includes(x)).size
    };
}).sort((a, b) => b.Total - a.Total).splice(0, 15).map((user, index) => `\`${index + 1}.\` **${user.Id}** (\`${user.Total} kişi\`)`).join("\n") || "\`\`\`Datacenter'da kaydedilen bir veri görüntülenemedi\`\`\`"}
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
    aliases: ["yasaklitag", "yasaklı-tag", "yasakli-tag"],
    permLevel: 0
};

exports.help = {
    name: 'yasaklıtag',
    description: "İsminde istemediğiniz kelime/sembolleri yasaklayarak üyeleri karantinaya atmaya yarayan bir sistemdir!",
    usage: 'yasaklıtag ekle <tag> / yasaklıtag sil <tag>',
    kategori: 'Sahip'
};

function removeItemOnce(arr, value) { var index = arr.indexOf(value); if (index > -1) { arr.splice(index, 1); } return arr; }