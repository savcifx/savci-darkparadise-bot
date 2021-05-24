const Discord = require("discord.js");
const qdb = require("quick.db");
let inviteDB = new qdb.table("invitemanager")

/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */
exports.run = async (client, message, args) => {

    var victim = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
    var data = await inviteDB.get(`invites.${victim.id}`) || await inviteDB.set(`invites.${victim.id}`, { total: 0, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 });
    
    if (args[0] == "genelekle") {
      message.guild.fetchInvites().then(async Invites => {
        Invites.forEach(async (Invite, index) => {

        setTimeout(async () => {
          if (!await inviteDB.get(`invites.${Invite.inviter.id}`)) await inviteDB.set(`invites.${Invite.inviter.id}`, { total: 0, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 });
               await inviteDB.set(`invites.${Invite.inviter.id}`, { total: Invite.uses, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 })
        }, index*2500)
    });
  }).catch(console.error);
        
        return message.channel.send("Başarılı")
    }

    var embed = new Discord.MessageEmbed()
    .setAuthor(client.users.cache.get(victim.id).username, client.guilds.cache.get(message.guild.id).members.cache.get(victim.id).user.displayAvatarURL())
    .setDescription(`Şuan **${(data.total || 0) + (data.bonus || 0)}** davetin var! (**${data.regular || 0}** regular, **${data.bonus || 0}** bonus, **${data.leave || 0}** leaves, **${data.fake || 0}** fake)`)
    .setColor("RANDOM")
    .setFooter(client.user.username, client.user.avatarURL())
    .setTimestamp();
    if (args[0]) {
        var embedvictim = new Discord.MessageEmbed()
        .setAuthor(client.users.cache.get(victim.id).username, client.guilds.cache.get(message.guild.id).members.cache.get(victim.id).user.displayAvatarURL())
        .setDescription(`Şuan **${(data.total || 0) + (data.bonus || 0)}** daveti var! (**${data.regular || 0}** regular, **${data.bonus || 0}** bonus, **${data.leave || 0}** leaves, **${data.fake || 0}** fake)`)
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.avatarURL())
        .setTimestamp();
        return message.channel.send(embedvictim)


    } else {
        return message.channel.send(embed);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["davetk", "davetlerim", "rank"],
    permLevel: 0
  };
  
  exports.help = {
    name: "invite",
    description: "Sunucudaki davet bilgilerinizi görüntülersiniz",
    usage: "invite",
    kategori: "Invite Manager"
  };
  