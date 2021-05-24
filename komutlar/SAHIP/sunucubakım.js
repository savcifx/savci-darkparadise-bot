const qdb = require("quick.db");

const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if (!message.guild) return;
    let db = new qdb.table("sunucuayar");
    let guvenliKisiDB = new qdb.table("guvenlikisi");
    
    let gkv = await guvenliKisiDB.get(`guvenlikisi`) || []
    if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {
        const sec = args[0]
        let sunucubakım = await db.get(`sunucubakim`)
        let embed = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.username || message.member.nickname, message.author.avatarURL())


        if (!sec) {
            const embed2 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.username || message.member.nickname, message.author.avatarURL())
                .setDescription(`
**Sunucu Bakım Nedir ?**

Bildiğiniz üzere public sunucularda yeni açılan veya açılacak olan sunucular genelde \`#Yakında Aktifiz\` adı altında bir sunucu ismi yapıyorlar.

**Bizde şöyle bir olay düşündük:**
Sunucunuz bakım sırasındayken ekibinize gelen üyelerin ekipten ayrıldığı zaman sunucunuzda \`Kayıtsız Üye\` rolüne atanmasını sağlamak istedik.

Bu özelliği açtığınız zamanda üyeler ekip rolünü bıraktığı zaman
\`Kayıtsız Üye\` rolüne geçiş sağlayacaktır.
Bu sistem kapatıldığı zaman ekibinizden ayrılan üyeler sunucunuzda
\`Erkek-Kadın\` rolü hangi rol ise üstündeki tüm yetkiler alınıp sadece o roller kalacaktır.

**Kisuke bot iyi eğlenceler diler...**`)

            message.channel.send({
                embed: embed2
            })
        }
        if (sec === "aç" || sec === "aktif") {
            if (sunucubakım) {
                return message.channel.send(embed.setDescription(`Sunucu zaten bakım modunda`))
            } else {
                await db.set(`sunucubakim`, "Bakimda")
                return message.channel.send(embed.setDescription(`Sunucu başarılı bir şekilde bakım moduna alındı`))
            }
        }
        if (sec === "kapat" || sec === "deaktif") {
            if (!sunucubakım) {
                return message.channel.send(embed.setDescription(`Sunucu bakım modundan çıkartıldı!`))
            } else {
                await db.delete(`sunucubakim`)
                return message.channel.send(embed.setDescription(`Sunucu başarılı bir şekilde bakım modundan çıkartıldı`))
            }
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
    aliases: ["sunucubakim", "sunucu-bakım", "sunucu-bakim"],
    permLevel: 0
};

exports.help = {
    name: 'sunucubakım',
    description: 'Sunucuyu bakım moduna alabilirsiniz veya kapatabilirsiniz',
    usage: 'sunucubakım aç/kapat',
    kategori: 'Sahip'
};