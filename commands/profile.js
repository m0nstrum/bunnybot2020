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

const getUrls = require('get-urls')
var UrlPattern = require('url-pattern');
var patternone = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)')
const urlRegex = require('url-regex');

module.exports.run = async (client, message, args, talkedRecently, talkedRecently2) =>
{

    try {
    	var canmarry = true
        var  p
        let nam
        if (message.member.nickname == undefined) {
            nam=message.member.user.username
        }
        else {
            nam = message.member.nickname
        }
        if(message.mentions.members.first()) {
            let r = await awaitmongo(url, dbName, 'find', 'xp', {name: message.mentions.members.first().id})
                if(r[0] == undefined) {
                	message.reply('Пользователь еще не создал свой профиль! Попроси его написать команду "!profile"')
                	return
                } ;

            if (r[0].para != "false")  {
                r[0].para = message.guild.members.cache.find(val => val.id == r[0].para)
                if(r[0].para == undefined) {
                	r[0].para =  'Никого нет(('
                	return

                }
                if (r[0].para.nickname == undefined) {
                    r[0].para  =  r[0].para.user.username
                } else {
                    r[0].para  =  r[0].para.nickname

                }

            }
            else {
                r[0].para = 'Никого нет(('
            }

            let embed = new Discord.MessageEmbed()
                embed.setAuthor('Профиль ' + message.mentions.members.first().user.tag,  message.mentions.members.first().user.avatarURL())
                embed.setColor(16757228)
                embed.addField('<:maniiiiiii:667810192850944040>Баланс',"```" + r[0].coins +'🐰    ' + r[0].boxes + "🎁```", true )
                embed.addField('<:sms:667810192829972506> Сообщений',"```" + r[0].messages + "```", true )
                embed.addField('<:micro:667810192792223745> Голосовой онлайн',"```" +r[0].onlined.toFixed(2) + "```", true )
                embed.addField('<:love:667810193098407946> Пара',"```" +r[0].para + "```", true )
                embed.addField('<:lvl:667849717539012659> Уровень',"```" +r[0].lvl + "```", true)

                embed.addField('<:card:667810193077174303> О себе',"```" +r[0].about + "```", true )
                //.addField('[<:vk:667810192921985067> VK](' +r[0].vk + ')',"``" +r[0].vk + "``", true )

                embed.addField('\u200b', '\u200b')
                embed.setTimestamp()
                embed.setFooter('Запросил, ' +  message.author.tag)
            let embedde  = false
            let de
            if (r[0].vk == "false") {
                r[0].vk  = 'Не указан'

            } else {
                de = '[<:vk:667810192921985067>](' +r[0].vk + ')'
                embedde = true
            }
            if (r[0].inst =='false') {
                r[0].vk =  'Не указан'
            }
            else {
                embedde = true
                if (de != undefined)  {
                    de = de  + ' [<:inst:668126488364580865> ](' +r[0].inst + ')'}
                else {
                    de ='[<:inst:668126488364580865> ](' +r[0].inst + ')'
                }

            }

            if(embedde) {
                embed.setDescription(de)
            }
            let ms = await message.channel.send({embed})

            return
        }
        let r = await awaitmongo(url, dbName, 'find', 'xp', {name: message.member.id})
        let descrip
        if (r[0] == undefined) {
            let d = await awaitmongo(url, dbName, 'insertOne', 'xp', {name: message.member.id, xp:1, lvl:1, coins:1, messages:0, onlined:0, para:"false", vk:"false", about:"false", boxes:0})
            r =[{}]
            r[0].coins = 1
            r[0].lvl = 1
            r[0].xp = 1
            r[0].messages = 0
            r[0].onlined = 0
            r[0].para = "false"
            r[0].vk="false"
            r[0].about ="false"
            r[0].boxes = 0
            r[0].inst ="false"
        }
        if (r[0].messages == undefined) {
            r[0].messages = 0
            awaitmongo(url, dbName, 'updateOne', 'xp', {name:  message.member.id}, { $set: { messages: 0}})
        }
        if (r[0].coins == undefined) {
            r[0].coins = 0
            awaitmongo(url, dbName, 'updateOne', 'xp', {name:  message.member.id}, { $set: { coins: 0}})
        }
        if (r[0].boxes == undefined) {
            r[0].boxes = 0
            awaitmongo(url, dbName, 'updateOne', 'xp', {name:  message.member.id}, { $set: { boxes: 0}})
        }
        if (r[0].lvl == undefined) {
            r[0].lvl = 0
            awaitmongo(url, dbName, 'updateOne', 'xp', {name:  message.member.id}, { $set: { lvl: 0}})
        }
        if (r[0].xp == undefined) {
            r[0].xp = 0
            awaitmongo(url, dbName, 'updateOne', 'xp', {name:  message.member.id}, { $set: { xp: 0}})
        }
        if (r[0].onlined == undefined) {
            r[0].onlined = 0
            awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id}, { $set: { onlined: 0}})
        }
        if (r[0].para == undefined) {
            r[0].para = "false"
            awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id}, { $set: { para: "false"}})
        }
        if (r[0].vk == undefined) {
            r[0].vk = "false"
            awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id}, { $set: { vk: "false"}})
        } else{

        }

        if (r[0].inst == undefined) {
            r[0].inst = "false"
            awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id}, { $set: { inst: "false"}})
        }

        if (r[0].about == undefined) {
            r[0].about = "false"
            awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id}, { $set: { about: "false"}})
        }
        if (r[0].para != "false")  {
            r[0].para = message.guild.members.cache.find(val => val.id == r[0].para)
            if (!r[0].para) {
            	r[0].para = 'пара покинула сервер(('
            } else if (r[0].para.nickname == undefined) {
            	               r[0].para  =  r[0].para.user.username

            }
            else {
                r[0].para  =  r[0].para.nickname

            }

        }
        else {
            r[0].para = 'Никого нет(('
        }

        if (r[0].about == "false") {
            r[0].about = 'Не указано'
        }

        let embed = new Discord.MessageEmbed()
            embed.setAuthor('Профиль ' + nam, message.author.avatarURL())
            embed.setColor(16757228)
            embed.addField('<:maniiiiiii:667810192850944040>Баланс',"```" + r[0].coins +'🐰    ' + r[0].boxes + "🎁```", true )
            embed.addField('<:sms:667810192829972506> Сообщений',"```" + r[0].messages + "```", true )
            embed.addField('<:micro:667810192792223745> Голосовой онлайн',"```" +r[0].onlined.toFixed(2) + " ч```", true )
            embed.addField('<:love:667810193098407946> Пара',"```" +r[0].para + "```", true )
            embed.addField('<:lvl:667849717539012659> Уровень',"```" +r[0].lvl + "```", true)

            embed.addField('<:card:667810193077174303> О себе',"```" +r[0].about + "```", true )
            //.addField('[<:vk:667810192921985067> VK](' +r[0].vk + ')',"``" +r[0].vk + "``", true )

            embed.addField('\u200b', '\u200b')
            embed.setTimestamp()
            embed.setFooter('Привет, ' + nam)
        let embedde  = false
        let de
        if (r[0].vk == "false") {
            r[0].vk  = 'Не указан'

        } else {
            de = '[<:vk:667810192921985067>](' +r[0].vk + ')'
            embedde = true
        }
        if (r[0].inst =='false') {
            r[0].vk =  'Не указан'
        }
        else {
            embedde = true
            if (de != undefined)  {
            de = de  + ' [<:inst:668126488364580865> ](' +r[0].inst + ')'}
            else {
                de ='[<:inst:668126488364580865> ](' +r[0].inst + ')'
            }

        }

        if(embedde) {
            embed.setDescription(de)
        }
       let ms = await message.channel.send({embed})
        canmarry = true
let tor

         p = r[0].para
        if(p == 'Никого нет((') {
              tor= message.guild.emojis.cache.get('667810193098407946')
              canmarry = true
              console.log('can marry')
        }
        else {
            tor =  message.guild.emojis.cache.get('667809067703730205')
            canmarry = false
            console.log('cant marry')
        }

        await ms.react(tor)
        tor  = message.guild.emojis.cache.get('667810193077174303')
        await ms.react(tor)
        tor  = message.guild.emojis.cache.get('667810193077174303')
        tor = message.guild.emojis.cache.get('667810192921985067')

        await ms.react(tor)
        tor = message.guild.emojis.cache.get('668126488364580865')
        ms.react(tor)

        var filter = (reaction, user) => user.id == message.author.id
        var collector = ms.createReactionCollector(filter, {time: 60000});
        collector.on('collect', r =>{
            collector.stop()
            if (r.emoji.id == '667810192921985067') {
                //vk
            async function vkk() {
                let mm = await message.reply('Напишите ссылку на ваш Вк')
                const colllector = new Discord.MessageCollector(mm.channel, m => m.author.id == message.author.id, { time: 60000 });
                colllector.on('collect', async message => {
                    colllector.stop()
                    let  nn  =  message.content
                    let totest  =  Array.from(getUrls(nn))
                    let sitedata = patternone.match(totest[0])
                    if(!sitedata || sitedata.domain !='vk' || sitedata.tld !='com' || !sitedata['_']) {
                        let notparv =  await message.reply('Неправильная ссылка.Повторить?')

                        notparv.react('668405092701044736')
                        var filter = (reaction, user) => user.id == message.author.id
                        var collector = notparv.createReactionCollector(filter, {time: 60000});
                        collector.on('collect', r =>{
                            collector.stop()

                            if(r.emoji.id=='668405092701044736') {
                                vkk()
                        }})

                        return
                    }
                    awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id}, {$set:{vk:message.content} })
                    message.reply('Успешно!')

                })
            }
            vkk()
        }

        if (r.emoji.id == '668126488364580865') {
            //inst
            async function inst() {
                let mm = await message.reply('Напишите ссылку на ваш Инстаграмм')
                const colllector = new Discord.MessageCollector(mm.channel, m => m.author.id == message.author.id, { time: 60000 });
                colllector.on('collect', async message => {
                    colllector.stop()
                    let  nn  =  message.content
                    let totest  =  Array.from(getUrls(nn))
                    let sitedata = patternone.match(totest[0])
                    if(!sitedata || sitedata.domain !='instagram' || sitedata.tld !='com' || !sitedata['_']) {
                        let notparv =  await message.reply('Неправильная ссылка.Повторить?')

                        notparv.react('668405092701044736')
                        var filter = (reaction, user) => user.id == message.author.id
                        var collector = notparv.createReactionCollector(filter, {time: 60000});
                        collector.on('collect', r =>{
                            collector.stop()

                            if(r.emoji.id=='668405092701044736') {
                            inst()
                        }})

                        return
                    }
                    awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id}, {$set:{inst:message.content} })
                    message.reply('Успешно!')

                })
            }
            inst()
        }
        console.log(canmarry + ' canmarry')
        if (r.emoji.id == '667810193098407946' && canmarry == true) {
            //lover
      async function loverr() {
                let mka = await message.reply('Тегните вашу пару')
                const colllector = new Discord.MessageCollector(mka.channel, m => m.author.id == message.author.id, { time: 30000 });
                colllector.on('collect', async message => {
                    let  memb =  message.mentions.members.first()
                    if(!memb) {
                        message.reply('Вы никого не упомянули')
                        return
                    }
                    colllector.stop()
                    if(memb == message.member) return
                    	let checkpar = await awaitmongo(url, dbName, 'find', 'xp', {name: message.mentions.members.first().id})
                    checkpar= checkpar[0]
                    if (checkpar.para !="false" && checkpar.para !=undefined) {
                    		console.log('mentioned has para')
                    	return;}
                    let mmm = await message.channel.send(`${memb}` +  ', ' + `${message.member}` + ' делает вам предложение! Вы согласны?')
                    mmm.react('668405092701044736')
                    mmm.react('668405092810096660')
                    var filter = (reaction, user) => user.id == memb.id
                    var collector = mmm.createReactionCollector(filter, {time: 60000});
                    collector.on('collect', r =>{
                        collector.stop()
                        if(r.emoji.id=='668405092701044736') {

                        let em = new Discord.MessageEmbed()
                            em.setDescription(`${memb}` + ' и ' + `${message.member}` +' поженились')
                            em.setTimestamp()
                            em.setImage('https://cdn.discordapp.com/attachments/667847638749544459/668398923278450701/original.gif')
                            em.setColor(16236543)
                        message.channel.send(em)



                        awaitmongo(url, dbName, 'updateOne', 'xp', {name: memb.id},  { $set: {para: message.member.id }})
                        awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id},  { $set: {para: memb.id }})
                    }
                else {

                    }
                })
                })
            }
            loverr()
        }
        if (r.emoji.id == '667810193077174303') {
            //about
            async function abb() {
               let mmsk  = await message.reply('Расскажите о себе. Не более 20 символов.')
                const colllector = new Discord.MessageCollector(mmsk.channel, m => m.author.id == message.author.id, { time: 360000 });
                colllector.on('collect', async message => {
                    colllector.stop()
                    if (message.content.length >20) {
                        let kkk = await message.reply('В вашем сообщении более 20 символов. Еще раз?')
                        kkk.react('668405092701044736')
                        var filter = (reaction, user) => user.id == message.author.id
                        var collector = kkk.createReactionCollector(filter, {time: 60000});
                        collector.on('collect', r =>{
                            collector.stop()

                            if(r.emoji.id=='668405092701044736') {
                          abb()
                        }

                        })
                    }
                    else {
                        let tochek = getUrls(message.content)
                        let anothercheckes = false
                        tochek.forEach(function (i) {
                            let urlscheck = urlRegex({strict: false}).test(i);

                            if  (urlscheck)  {
                                anothercheckes = true

                            }

                        })


                        if (anothercheckes) {
                            return
                        }

                        let em = new Discord.MessageEmbed()
                         em.setTitle('Ваше сообщение:')
                         em.setDescription(message.content)
                         em.addField('Установить?', '<:yes:668405092701044736> - да, <:no:668405092810096660>  - нет, ✏ - изменить')
                     let otv = await message.reply(em)
                        otv.react('✏')
                        otv.react('668405092701044736')
                        otv.react('668405092810096660')
                        var filter = (reaction, user) => user.id == message.author.id
                        var collector = otv.createReactionCollector(filter, {time: 60000});
                        collector.on('collect', r =>{
                            collector.stop()
                            if(r.emoji.id=='668405092701044736') {
                            r =  awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id}, {$set:{about:message.content} })
                            message.reply('Успешно!')
                            }
                    else if (r.emoji.name == '✏')  {
                            abb()
                            }
                        })

                    }
                        })
                }
            abb()

            }
        if (r.emoji.id  == '667809067703730205') {
            async function razvod() {
                let eys = await message.reply('Вы точно хотите расстаться с '+ p +  '?')

                eys.react('668405092701044736')
                var filter = (reaction, user) => user.id == message.author.id
                var collector = eys.createReactionCollector(filter, {time: 60000});
                collector.on('collect', async r =>{
                    collector.stop()
                    let nnn = await awaitmongo(url, dbName, 'find', 'xp', {name: message.member.id})
                    let par = nnn[0].para
                    awaitmongo(url, dbName, 'updateOne', 'xp', {name: par},  { $set: {para: "false" }})
                    awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id},  { $set: {para: "false" }})
                    par  =  message.guild.members.cache.find(val => val.id == par)
                    let em = new Discord.MessageEmbed()
                        .setDescription(`${par}` + ' и ' + `${message.member}` +' расстались(')
                        .setTimestamp()
                        .setImage('https://cdn.discordapp.com/attachments/667847638749544459/668402739692175360/original.gif')
                        .setColor(2697513)
                    message.channel.send(em)
                })
            }
            razvod()
        }
        })
        }

    catch (err) {
        console.log(err)
    }
}
module.exports.help = {
    name: 'profile',
    aliases:["профиль","profil", "статус","marry", "я", "balance"],
    help:"Профиль с информацией пользователе, меню для свадьбы. Свой профиль: !profile, чужой профиль: !profile @kva"}