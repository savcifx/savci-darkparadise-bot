const qdb = require("quick.db");

module.exports = async message => {
  if (!message.guild) return
  let db = new qdb.table("blacklist");

  let client = message.client;
  if (message.author.bot) return;

  const prefixes = client.ayarlar.prefix;
  const prefix = prefixes.filter(p => message.content.startsWith(p))[0];
  
  if (!prefix) return
  
  var blackList = await db.get("blacklist." + message.author.id);
  if (blackList)
    return message.reply(", üzgünüm ama kara listedesin!");

    let command = message.content.split(" ")[0].slice(prefix.length);

  let params = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(client, message, params);
  }


};