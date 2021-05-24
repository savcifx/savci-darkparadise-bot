const Discord = require("discord.js");
const qdb = require("quick.db");
exports.run = async(client, message, args) => {
  if (!message.guild) return;
  let prefix = client.ayarlar.prefix

        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Sunucu Komutları Hakkında Bilgilendirme!
**Genel Komutlar (Herkes Kullanabilir)**

Bu komutları sunucu içerisindeki tüm üyelerimiz sorunsuz bir şekilde kullanabilir.
\`\`\`
${prefix[0]}rank
${prefix[0]}avatar
${prefix[0]}bilgi
${prefix[0]}git
${prefix[0]}stats
${prefix[0]}top
${prefix[0]}yardım
\`\`\`
**Moderasyon Komutlar (Sadece Yetkililer)**

Bu Komutları sunucu içerisindeki yetkililerimiz sadece kullanabilmektedir.
\`\`\`
${prefix[0]}ban
${prefix[0]}çek
${prefix[0]}denetle
${prefix[0]}erkek
${prefix[0]}isim
${prefix[0]}isimler
${prefix[0]}jail
${prefix[0]}kadın
${prefix[0]}mute
${prefix[0]}rolbak
${prefix[0]}rolidbak
${prefix[0]}seskontrol
${prefix[0]}sesmute
${prefix[0]}temizle
${prefix[0]}tempmute
${prefix[0]}tempjail
${prefix[0]}uyarı
${prefix[0]}teyitbilgi
${prefix[0]}unban
${prefix[0]}unjail
${prefix[0]}unmute
${prefix[0]}unsesmute
${prefix[0]}yetki ver
${prefix[0]}rol ver
${prefix[0]}yoklama
${prefix[0]}cezalar
${prefix[0]}cezaID
\`\`\`
**Sahip Komutlar (Sadece Kurucu & GKV)**

Bu Komutları sunucu içerisindeki Owner ve GKV üyeleri kullanabilirler
\`\`\`
${prefix[0]}yasaklıtag
${prefix[0]}otorol
${prefix[0]}ototag
${prefix[0]}reklam
${prefix[0]}çekiliş
${prefix[0]}sunucubakım
${prefix[0]}yedekal
${prefix[0]}yedekver
${prefix[0]}ayarlar
${prefix[0]}koruma
${prefix[0]}kurulum
${prefix[0]}güvenlikişi
${prefix[0]}toplu-rol-ver
${prefix[0]}ikilitagsistemi
${prefix[0]}isim-yaş-sistemi
${prefix[0]}isimtemizleyici
${prefix[0]}küfür
${prefix[0]}logsistemi
${prefix[0]}otokayıt
\`\`\`
**Vampir Köylü Komutlar (VK Oyun Yönetici)**

Bu Komutları sunucu içerisindeki VK Oyun Yönetici üyeleri kullanabilirler
\`\`\`
${prefix[0]}vkstart
${prefix[0]}vkroller
${prefix[0]}vkekle
${prefix[0]}vkdurum
${prefix[0]}vkgece
${prefix[0]}vkgündüz
${prefix[0]}vkoldur
${prefix[0]}vkbitir
\`\`\`
`))


};
exports.conf = {
  aliases: ["help", "yardim", "komutlar", "komut", "Yardım", "Yardim", "Komutlar", "Komut", "Help"],
  permLevel: 0
};
exports.help = {
  name: "yardım",
  usage: "yardım [komut ismi<isteğe bağlı>]",
  description: "Komut listesi",
  kategori: "Genel"
}
