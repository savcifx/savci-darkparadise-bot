const { deflateStrategy } = require('jimp');
const moment = require('moment');
require("moment-duration-format");
const qdb = require("quick.db");
let sunucuayarDB = new qdb.table("sunucuayar");
let rolAyarlarDB = new qdb.table("rolayarlar");
module.exports = async client => {


try {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);

 client.user.setStatus("online");
  setInterval(() => {
      const oynuyor = client.ayarlar.readyFooter;
      const index = Math.floor(Math.random() * (oynuyor.length));
      client.user.setActivity(`${oynuyor[index]}`, {type: "WATCHING"});
    }, 10000);

} catch (err) { }


/*
client.guilds.cache.get("727881213406347282").members.cache.map(x => {
  let roller = ["727881525491925022", "727881547528798219", "727881549671956560", "727881546836607106", "727881526175334429", "727881522668896350", "727881522236883004", "729466637094354974", "727881520915808308" , "730213053747953725" , "727881519456321616", "743255932137373820","758415750213664778"]
  let roller2 = ["764499433978200074","761006913982038036","761006913730248746","761006909964025867","761006909359915010","761006908629975040","761006905702481941","761006904570806313","761006903093493780","761006901520498738","761006899197902859","761006897372332062","761006895094825001"]
  if (x.roles.cache.get(roller)) {
    client.guilds.cache.get("760986640272457758").members.cache.map(x => x.roles.add(roller2))
  }
});
*/


client.guilds.cache.map(async x => {
  client.guilds.cache.get(x.id).members.cache.map(async y => {

    let limit = await rolAyarlarDB.get(`rolayarlar.jail_limit`)
    let limituser = await rolAyarlarDB.get(`rolayarlar.${y.id}.jail_limit`);
    if (limit <= limituser) {
      let vmute_kontrol = await rolAyarlarDB.get(`mute_limit_kontrol`);
      let mute_kontrol = await rolAyarlarDB.get(`mute_limit_kontrol`);
      let ban_kontrol = await rolAyarlarDB.get(`ban_limit_kontrol`);
      let jail_kontrol = await rolAyarlarDB.get(`jail_limit_kontrol`);

      setInterval(async () => {
        if (Date.now() - jail_kontrol >= 1000 * 60 * 10) {
          await rolAyarlarDB.delete(`rolayarlar.${y.id}.jail_limit`)
        }
        if (Date.now() - ban_kontrol >= 1000 * 60 * 10) {
          await rolAyarlarDB.delete(`rolayarlar.${y.id}.ban_limit`)
        }
        if (Date.now() - mute_kontrol >= 1000 * 60 * 10) {
          await rolAyarlarDB.delete(`rolayarlar.${y.id}.mute_limit`)
        }
        if (Date.now() - vmute_kontrol >= 1000 * 60 * 10) {
          await rolAyarlarDB.delete(`rolayarlar.${y.id}.vmute_limit`)
        }
      }, 1000*60*5);
    }
  })
})

  let stats_daily = new qdb.table("stats_daily")
  let stats_week = new qdb.table("stats_week")
  let stats_two_week = new qdb.table("stats_two_week")
  let stats_three_week = new qdb.table("stats_three_week")
  let stats_month = new qdb.table("stats_month")

  let mstats_week = new qdb.table("mstats_week")
  let mstats_daily = new qdb.table("mstats_daily")
  let mstats_two_week = new qdb.table("mstats_two_week")
  let mstats_three_week = new qdb.table("mstats_three_week")
  let mstats_month = new qdb.table("mstats_month")
  setInterval(async () => {
    let sonSifirlanma = await sunucuayarDB.get(`stats_kontrol`);
    if (Date.now() - sonSifirlanma >= 1000 * 60 * 60 * 24 * 1) {
      await stats_daily.delete(`stats_daily`);
      await mstats_daily.delete(`message_daily`)
      await sunucuayarDB.set(`stats_kontrol`, Date.now());
      console.log("Günlük Veriler sıfırlandı")
    } 
    if (Date.now() - sonSifirlanma >= 1000 * 60 * 60 * 24 * 7) {
      await stats_week.delete(`stats_week`);
      await mstats_week.delete(`message_week`)
      await sunucuayarDB.set(`stats_kontrol`, Date.now());
      console.log("1 Haftalık Veriler sıfırlandı")
    } 
    if (Date.now() - sonSifirlanma >= 1000 * 60 * 60 * 24 * 14) {
      await stats_two_week.delete(`stats_two_week`);
      await mstats_two_week.delete(`message_two_week`)
      await sunucuayarDB.set(`stats_kontrol`, Date.now());
      console.log("2 Haftalık Veriler sıfırlandı")
    } 
    if (Date.now() - sonSifirlanma >= 1000 * 60 * 60 * 24 * 21) {
      await stats_three_week.delete(`stats_three_week`);
      await mstats_three_week.delete(`message_three_week`)
      await sunucuayarDB.set(`stats_kontrol`, Date.now());
      console.log("3 Haftalık Veriler sıfırlandı")
    } 
    if (Date.now() - sonSifirlanma >= 1000 * 60 * 60 * 24 * 28) {
      await stats_month.delete(`stats_month`);
      await mstats_month.delete(`message_month`)
      await sunucuayarDB.set(`stats_kontrol`, Date.now());
      console.log("Aylık Veriler sıfırlandı")
    }
  }, 1000 * 60 * 10);
if (await sunucuayarDB.get(`stats_kontrol`)) return
console.log("Veri sıfırlama süresi başladı 30 gün sonra sıfırlanacaktır.")
sunucuayarDB.set(`stats_kontrol`, Date.now());
};