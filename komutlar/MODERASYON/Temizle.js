let qdb = require("quick.db");
exports.run = async(client, message, args) => {
  if (!message.guild) return
  let db = new qdb.table("rolayarlar");

  let arr = await db.get(`rolayarlar.genel_rol_sorumlusu`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {


   const sayi = args[0]

   if (!sayi) return message.reply("En Az `1 - 100` Arasında Bir Tam Sayı Değeri Girmelisiniz.")

  if (sayi >= 101) return message.reply("En Az `1 - 100` Arasında Bir Tam Sayı Değeri Girmelisiniz.")

  let messages = await message.channel.messages.fetch({ limit: sayi })

     let mesaj = await message.channel.bulkDelete(messages, true);

  if (!mesaj.size) {
    return message.reply("En Az `1 - 100` Arasında Bir Tam Sayı Değeri Girmelisiniz.")
  }


    message.reply(`${mesaj.size} Adet Mesaj Başarılı Bir Şekilde Silindi`)


   } else {
    return message.reply("Bu komutu kullanabilmek için Ozel Rol Sorumlusu ya da Yönetici olmalısın.")
  }


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sil"],
  permLevel: 0
};

exports.help = {
  name: 'temizle',
  description: 'Belirlediğiniz miktarda sohbete yazılan mesajları temizler',
  usage: 'temizle <1-100>',
  kategori: 'Moderasyon'
};
