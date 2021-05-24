const Discord = require("discord.js");
const qdb = require("quick.db");
exports.run = async function (client, message, args) {
	if (!message.guild) return
	let db = new qdb.table("sunucuayar");
	let db2 = new qdb.table("prefix");
	let db3 = new qdb.table("vampirkoylu")

	const prefix = await db2.get(`prefix`) || client.ayarlar.prefix
	const vkyonetici = await db.get(`sunucuayar.vkyonetici`);
	if (!message.member.roles.cache.has(vkyonetici) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply("Yönetici ya da VK Sorumlusu olman gerekiyor!")
	if (!message.member.voice.channel) return message.reply(`Hata: Bu komutu kullanabilmek için bir ses kanalında olmanız gerekiyor`)
	let vklobi = await db3.get(`vk.lobi.${message.member.voice.channel.id}`) || false
	let vkdurum = await db3.get(`vkdurum.${message.member.voice.channel.id}`)
	 if (vkdurum == "Aktif") {
		return message.channel.send(`${message.author}, Oyun zaten başladı bitirmek için  (\`${prefix[0]}vkbitir\`) yazmalısın!`)
	} else {
		let sestekiUyeler = message.member.voice.channel.members.filter(member => !member.voice.serverDeaf && message.member.id != member.id).array();
		if(sestekiUyeler.length < 5) return message.channel.send("Bu oyunun başlayabilmesi için 5'den fazla üye olması gerekiyor!");
	
	
		let roller = ["vampir", "büyücü", "jester", "retri"];
		
		if (!args[0]) {
			return message.reply(`Lütfen geçerli bir rol belirtiniz (\`${prefix[0]}vkroller 2vampir 1büyücü 1jester\`) gibi yapabilirsiniz`)
		}

		let filteredArgs = args.filter(e => roller.some(rol => rol == e.substring(1, e.length).toLowerCase()));
		let _roles = [];
		let roltoplam = 0;
		filteredArgs.forEach(farg => {
			let num = Number(farg.charAt(0));
			if(!isNaN(num)){
				for(let i = 0; i < num; i++)
					_roles.push(farg.substring(1, farg.length));
				roltoplam += num;
			}
		});
		shuffle(_roles);
		shuffle(sestekiUyeler)
		let listed = {};
		let koylutoplam = 0;
		sestekiUyeler.forEach((member, index) => {
			if(_roles[index])
				listed[member.id] = _roles[index];
			else
				listed[member.id] = "Köylü";
				koylutoplam+=1;
		})
		let durumlisted = {};
		sestekiUyeler.forEach((member, index) => {
			if(_roles[index])
				durumlisted[member.id] = _roles[index];
			else
				durumlisted[member.id] = "Köylü";
		})

	
	const rollerEmbed = new Discord.MessageEmbed()
	.setAuthor('Oyun Başladı', message.author.displayAvatarURL())
	.setColor('RANDOM')
	.setFooter(client.ayarlar.footer)
	.setTimestamp()
	.setDescription(`
**Dağıtılan Roller: (\`${koylutoplam} adet\`)**

**Köylü (\`${koylutoplam-roltoplam}\`) ${filteredArgs}**

**Dağıtılan Oyuncular:**
${sestekiUyeler}`)
	message.channel.send(rollerEmbed)
	let liste = Object.keys(listed).map(e => `<@${e}> [\`${capitalize(listed[e])}\`]`).join("\n")
	message.author.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`**Vampir Köylü Rol Listesi**\n\n${liste}`))
	// 
	await db3.set(`vkdurum.${message.member.voice.channel.id}`, "Aktif")
	await db3.set(`vk.oyunlar.${message.member.voice.channel.id}.roller`, listed);
	await db3.set(`vk.oyunlar.${message.member.voice.channel.id}.durumlisted`, durumlisted);
	}
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["vkroller",],
	permLevel: 0,
}

exports.help = {
	name: 'vkroller',
	description: 'Vampir köylü oyununu başlatmaya yaramaktadır',
	usage: 'vkroller',
	kategori: 'Vampir Koylu'
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
	  let j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
  }

function capitalize (s) {
	let x = s.toLowerCase();
	if (typeof x !== 'string') return ''
	return x.charAt(0).toUpperCase() + x.slice(1)
}

function lengthByArray(arr, result = {}){
	arr.forEach(e => result[e] ? result[e]++ : result[e] = 1);
	return result;
  }