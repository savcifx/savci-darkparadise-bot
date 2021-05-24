const Discord = require("discord.js");

const qdb = require("quick.db");
let inviteDB = new qdb.table("invitemanager")

// exports.onLoad = (client) => {};
/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("Bunun için gerekli izne sahip değilsin.");

    var victim = message.mentions.members.size > 0 ? message.mentions.members.first().id : args.length > 0 ? args[0] : undefined;
    if(!victim) return message.reply("Lütfen davet eklenecek kişiyi etiketleyiniz!");
    victim = message.guild.member(victim);
    if(!victim) return message.reply("Lütfen davet eklenecek kişiyi etiketleyiniz!");

    var num = Number(args[1]);
    if(isNaN(num)) return message.reply("Geçersiz rakam.");

    var bonus = (await inviteDB.add(`invites.${victim.id}.bonus`, num) || 0), total = (await inviteDB.get(`invites.${victim.id}.total`) || 0);
    message.reply(`${victim} Adlı Üyeye \`${num} davet\` eklendi.`);

    global.onUpdateInvite(victim, message.guild.id, total + bonus);
};

module.exports.conf = {
    aliases: ["davetekle", "bonus-davet", "davetbonus"],
    permLevel: 2,
    enabled: true,
    guildOnly: true,
  };
  
  module.exports.help = {
    name: "davet-ekle",
    description: "Belirlediğiniz üyeye Etkinlik davet ekler",
    usage: "davet-ekle @etiket",
    kategori: "Invite Manager"
  };