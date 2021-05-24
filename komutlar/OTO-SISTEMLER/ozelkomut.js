const Discord = require('discord.js')
const fs = require('fs')
const qdb = require("quick.db");

const stringTable = require('string-table');
exports.run = async (client, message, args) => {
    if (!message.guild) return;
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    const db = new qdb.table("ozelkomut");
    const prefixDB = new qdb.table("prefix");
    const yetkiDB = new qdb.table("rolayarlar");
    const prefix = prefixDB.get(`prefix`) || client.ayarlar.prefix;

    if (client.ayarlar.yapimci.some(x => message.author.id != x) && message.author.id != message.guild.owner.id)
    return message.reply(
      "Bu komut sadece TAÇ sahibi tarafından kullanılabilir"
    );
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    if (args[0] !== "ekle" && args[0] !== "oluştur" && args[0] !== "sil" && args[0] !== "kaldır" && args[0] !== "liste" && args[0] !== "list") return message.reply(`Yapılacak işlemi belirtmelisin! \`${prefix[0]}${this.help.name} ekle/sil/liste\``);
    let ozelkomutlar = await db.get(`ozelkomut`);
    if (!Array.isArray(ozelkomutlar)) await db.set(`ozelkomut`, []);
    if (args[0] === "ekle" || args[0] === "oluştur") {
        if (client.commands.has(args[1]) || client.aliases.has(args[1]) || (ozelkomutlar && ozelkomutlar.find(x => x.isim === args[1]))) return message.reply(`Botun var olan bir komutunu ekleyemezsin!`);
        let verilecekRol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(a => a.name === args[2]);
        let yetkiliROL = message.guild.roles.cache.get(args[3]) || message.guild.roles.cache.find(a => a.name === args[3]);
        if (!verilecekRol) return message.reply("Doğru Kullanım: "+ prefix[0] + "özelkomut ekle <komutadı> @verilecekrol <yetkiliID>")
        if (!yetkiliROL) return message.reply("Doğru Kullanım: "+ prefix[0] + "özelkomut ekle <komutadı> @verilecekrol <yetkiliID>")
        await db.push(`ozelkomut`, {
            isim: args[1],
            tur: "rol",
            verilecekRol: verilecekRol.id,
            yetkiliROL: yetkiliROL.id
        });
        message.channel.send(`\`${args[1]}\` isimli komutu \`${verilecekRol.name}\` adlı rolü özel rol yaptınız`)
    }

    if (args[0] === "sil" || args[0] === "kaldır") {
        if (args[1] == "hepsini") {
            await db.delete(`ozelkomut`);
        } else {
            if (!args[1]) return message.reply(`Silmek istediğin özel komutun adını girmelisin! \n**Örnek:** \`${prefix[0]}${this.help.name} sil komutAdı\``);
            let komut = args.slice(1).join(' ');
            if (!ozelkomutlar || ozelkomutlar.length === 0 || !ozelkomutlar.find(kmt => kmt.isim === komut)) return message.reply(`Belirtilen özel komut bulunamadı!`);
            let newArr = [];
            ozelkomutlar.forEach(async x => {
                if (x.isim !== komut) await newArr.push(x);
            });
            await db.set(`ozelkomut`, newArr);
            message.reply(`Belirtilen özel komut başarıyla silindi!`);
            return;
        }

    };
    if (args[0] === "liste" || args[0] === "list") {
        if (!ozelkomutlar || ozelkomutlar.length === 0) return message.reply(`Sunucunun özel komutları bulunamadı!`);
        let deneme = stringTable.create(ozelkomutlar.map(veri => Object.assign({KomutADI: veri.isim, ROL: message.guild.roles.cache.get(veri.verilecekRol).name, YETKI: message.guild.roles.cache.get(veri.yetkiliROL).name})), { headerSeparator: '-' })

        let komutlar = ozelkomutlar.map(kmt => `**Komut Adı:** \`${kmt.isim}\` | **Rol:** (\`${message.guild.roles.cache.get(kmt.verilecekRol).name}\`) | **Yetki:** \`${message.guild.roles.cache.get(kmt.yetkiliROL).name}\``).join('\n');
        
        message.channel.send(`${deneme}`, {split: true, code: "md"});
        return;
    };
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['özel-komut', 'ozelkomut', 'ozel-komut'],
    permLevel: 1,
};

exports.help = {
    name: 'özelkomut',
    description: 'Sunucunuza özel komut ekler.',
    usage: 'özelkomut ekle/sil/liste',
    kategori: 'Sahip'
};
