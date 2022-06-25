const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const Jimp = require('jimp');
const talkedRecently = new Set();
const MongoClient = require('mongodb').MongoClient;
const config = require("./config.json");

const url2 = config.url2;
const url = config.url
const dbName = config.dbName
//let r = await awaitmongo(url, dbName, 'find', 'xp', {name: member.id})
const awaitmongo = require('awaitmongodb')

module.exports.run = async (client, message, args, talkedRecently, talkedRecently2) =>
{

    try {
    let r = await awaitmongo(url, dbName, 'find', 'xp', {name: message.member.id})
        if(r[0] == undefined) return;
        async  function sho() {
        let em = new Discord.MessageEmbed()
        //.setTitle('Ваш ежедневный бонус: 300')
        //.setDescription('Текущий баланс: ' + nco )
            .setTitle('Ваш баланс: ' + r[0].coins + ' 🐰')
            .addField('1. 1000 🐰', '<@&668434766558789633>',true)//рэппер
            .addField('2. 1000 🐰', '<@&668801538344484864>',true)//крейзи
            .addField('3. 1000 🐰', '<@&668435706560905226>',true)//клоун
            .addField('4. 1500 🐰', '<@&668432348773220362>',true)//морковка
           // .addField('11. 999999999 🐰', '<@&668432384898629652>',true)//кролик
            .addField('5. 2500 🐰', '<@&668435903290540062>',true)//луна
            .addField('6. 3500 🐰', '<@&668435470514126874>',true)//дединсайд
            .addField('7. 5000 🐰', '<@&668435177784999966>',true)//барби
            .addField('8. 5000 🐰', '<@&668435530404462612>',true)//пикачу
            .addField('9. 5000 🐰', '<@&668434908695363596>',true)//йода
            .addField('10. 5000 🐰', '<@&668434349053706250>',true)//чеканная
            .addField('11. 10000 🐰', '<@&668434020526456840>',true)//чикибамбони
            .addField('12. 10000 🐰', '<@&668433172089798669>',true)//гллазки
            //.addField('25. 10000 🐰', '<@&668432891683930112>',true)//подарочек
            //.addField('26. 10000 🐰', '<@&668432775988117515>',true)//йертой
            //.addField('27. 15000 🐰', '<@&668433913265389570>',true)//пвп
            //.addField('28. 20000 🐰', '<@&668433821473046528>',true)//топхг
            //.addField('29. 50000 🐰', '<@&668435317841330176>',true)//зеленский
            //.addField('30. 100000 🐰', '<@&668433330856787969>',true)//меч

            .setFooter(message.author.tag, message.author.avatarURL())
            .setTimestamp()
            .setColor(16236543)
       let ccc = await message.channel.send(em)
       await ccc.react('➡')
            ccc.react('667854441021571118')

            var filter = (reaction, user) => user.id == message.author.id
        var collector = ccc.createReactionCollector(filter, {time: 120000});
        collector.on('collect', async z =>{
            collector.stop()
                if(z.emoji.name  == '➡')  {
            let em = new Discord.MessageEmbed()
            //.setTitle('Ваш ежедневный бонус: 300')
            //.setDescription('Текущий баланс: ' + nco )
                .setTitle('Ваш баланс: ' + r[0].coins + ' 🐰')

                .addField('13. 10000 🐰', '<@&668432891683930112>',true)//подарочек
                .addField('14. 10000 🐰', '<@&668432775988117515>',true)//йертой
                .addField('15. 15000 🐰', '<@&668433913265389570>',true)//пвп
                .addField('16. 20000 🐰', '<@&668433821473046528>',true)//топхг
                .addField('17. 50000 🐰', '<@&668435317841330176>',true)//зеленский
                .addField('18. 100000 🐰', '<@&668433330856787969>',true)//меч

                .setFooter(message.author.tag, message.author.avatarURL())
                .setTimestamp()
                .setColor(16236543)
            let cccc = await message.channel.send(em)
            await cccc.react('⬅')
                    cccc.react('667854441021571118')
            var filter = (reaction, user) => user.id == message.author.id
        var colleector = cccc.createReactionCollector(filter, {time: 120000});
        colleector.on('collect', z =>{
            colleector.stop()
            if(z.emoji.name == '⬅') {
            sho()
            } else {
                        buy()
                    }

        })
                }
        else {
                    buy()
                }
        })
        }
        sho()
async function buy() {
            let em = new Discord.MessageEmbed()
            //.setTitle('Ваш ежедневный бонус: 300')
            //.setDescription('Текущий баланс: ' + nco )
                .setTitle('Напишите номер роли, которую хотите купить.')
                .setFooter(message.author.tag, message.author.avatarURL())
                .setTimestamp()
                .setColor(16236543)
let mmm = await message.channel.send(em)
            const colllector = new Discord.MessageCollector(mmm.channel, m => m.author.id == message.author.id, { time: 60000 });
            colllector.on('collect', async message => {
                colllector.stop()
            let rolleee = parseInt(message.content)
                if(isNaN(rolleee)|| rolleee > 30 || rolleee < 1) {
                    let em = new Discord.MessageEmbed()
                        .setTitle('Неправильный номер роли, повторить?')
                    let rpp = await message.reply(em)
                    var filter = (reaction, user) => user.id == message.author.id
                    var colleector = rpp.createReactionCollector(filter, {time: 60000});
                    colleector.on('collect', async z =>{
                        colleector.stop()
                        buy()
                    })
                } else  {
                    let wannabu
                    let cena

                if (rolleee =='1') {//4
                    wannabu = '668434766558789633'
                    cena = 1000

                }
                else if(rolleee =='2') {//5
                    wannabu = '668801538344484864'
                    cena = 1000

                }
                else if(rolleee =='3') {//7
                    cena = 1000

                    wannabu = '668435706560905226'
                }
                else if(rolleee =='4') {//8

                    cena = 1500
                    wannabu = '668432348773220362'
                }
                else if(rolleee =='31') {//11
                    cena = 999999999

                    wannabu = '668432384898629652'
                }
                else if(rolleee =='5') {//12
                    cena = 2500

                    wannabu = '668435903290540062'
                }

                else if(rolleee =='6') {//18
                    cena = 3500

                    wannabu = '668435470514126874'
                }
                else if(rolleee =='7') {//19
                    cena = 5000

                    wannabu = '668435177784999966'
                }
                else if(rolleee =='8') {//20
                    cena = 5000

                    wannabu = '668435530404462612'
                }
                else if(rolleee =='9') {//21
                    cena = 5000

                    wannabu = '668434908695363596'
                }
                else if(rolleee =='10') {//22
                    cena = 5000

                    wannabu = '668434349053706250'
                }
                else if(rolleee =='11') {//24
                    cena = 10000

                    wannabu = '668434020526456840'
                }
                else if(rolleee =='12') {//24
                    cena = 10000

                    wannabu = '668433172089798669'
                }
                else if(rolleee =='13') {//25
                    cena = 10000

                    wannabu = '668432891683930112'
                }
                else if(rolleee =='14') {//26
                    cena = 10000

                    wannabu = '668432775988117515'
                }
                else if(rolleee =='15') {//27
                    cena = 15000

                    wannabu = '668433913265389570'
                }
                else if(rolleee =='16') {//28
                    cena = 20000

                    wannabu = '668433821473046528'
                }
                else if(rolleee =='17') {//29
                    cena = 50000

                    wannabu = '668435317841330176'
                }
                else if(rolleee =='18') {//30
                    cena = 100000

                    wannabu = '668433330856787969'
                }
                else  {
                    return
                }
                if (r[0].coins - cena < 0 ) {
                    let emba = new Discord.MessageEmbed()
                        .setTitle('Недостаточно коинов(')
                    message.reply(emba)
                    return
                }
                if(message.member.roles.cache.some(rol =>[wannabu].includes(rol.id))) {
                    let emmm =  new Discord.MessageEmbed()
                        .setTitle('У вас уже есть эта роль!')
                    return message.reply(emmm)
                    }
                    let rolll = message.guild.roles.cache.find(val => val.id == wannabu)
                    if(!rolll) return;
                message.member.roles.add(wannabu)
                    let necoi = r[0].coins
                    necoi  = necoi -  cena
                    awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id}, {$set:{coins: necoi}})
                    let succes = new Discord.MessageEmbed()
                        .setTitle('Успешно!')
                    message.channel.send(succes)
                }
            })
        }
        }
    catch (err) {
        console.log(err)
    }
}
module.exports.help = {
    name: 'shop',
    aliases:["шоп", 'магазин', 'магаз'],
    help:'Магазин ролей.'}