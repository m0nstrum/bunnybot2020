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
    var kavo = 'монет'
    async function valuesorter(arr, valu) {
        await arr.sort(function (a, b) {if(a.coins < b.coins) {
            return 1
        }
            if(a.coins > b.coins) {
                return -1
            }
        });

        return arr
    }

    async function valuesorter2(arr, valu) {
        await arr.sort(function (a, b) {if(a.onlined < b.onlined) {
            return 1
        }
            if(a.onlined > b.onlined) {
                return -1
            }
        });

        return arr
    }


    async function valuesorter3(arr, valu) {
        await arr.sort(function (a, b) {if(a.messages < b.messages) {
            return 1
        }
            if(a.messages > b.messages) {
                return -1
            }
        });

        return arr
    }

    try {
        let valuee
        let em = new Discord.MessageEmbed()
        var r
        if(args[0] == undefined) {
            return message.reply('Какой именно топ? Money, Voice, Messages?')
        }
        if(args[0].toLowerCase() == 'money' || args[0].toLowerCase()  ==  'деньги') {
            r = await awaitmongo(url, dbName, 'find', 'xp', {})
                        r.forEach(function (item) {
                item.valiii = item.coins
                if(item.coins == undefined) {
                    awaitmongo(url, dbName, 'updateOne', 'xp', {name:  item.id}, { $set: { coins: 0}})
                    item.valiii = 0

                }
            })
            r = await valuesorter(r, "coins")
            em.setTitle('Топ по количеству валюты на ' + message.guild.name)
            valuee = 'coins'
            kavo = '<:star:676059355711275010>'
            r.forEach(function (item) {
                item.valiii = item.coins
                if(item.coins == undefined) {
                    awaitmongo(url, dbName, 'updateOne', 'xp', {name:  item.id}, { $set: { coins: 0}})
                    item.valiii = 0

                }
            })

        }
        else if(args[0].toLowerCase() == 'voice' || args[0].toLowerCase() == 'голос') {
            r = await awaitmongo(url, dbName, 'find', 'xp', {})
            r.forEach(function (item) {
            let nanis = 0

                item.valiii = parseInt(item.onlined)
                if(isNaN(item.valiii)) {
                    nanis = nanis +1
                    awaitmongo(url, dbName, 'updateOne', 'xp', {name:  item.id}, { $set: { onlined: 0}})
                item.valiii = 0
                }
            })

            r=  await valuesorter2(r, "onlined")
            em.setTitle('Топ по голосовому онлайну на ' + message.guild.name)
            valuee = 'onlined'
            kavo = 'часов <:clock:676060832412729344> '

            console.log(nanis)
        }
        else  if(args[0].toLowerCase() == 'messages' || args[0].toLowerCase() == 'сообщения') {
            r = await awaitmongo(url, dbName, 'find', 'xp', {})
                        r.forEach(function (item) {
                item.valiii = item.messages
                if(item.messages == undefined) {
                    awaitmongo(url, dbName, 'updateOne', 'xp', {name:  item.id}, { $set: { messages: 0}})
                    item.valiii = 0

                }
            })
            r= await valuesorter3(r, "messages")
            em.setTitle('Топ по количеству сообщений на ' + message.guild.name)
            valuee = 'messages'
            kavo = 'сообщений<:post:676023916535349249> '

        }
        else {
            message.reply('Какой именно топ? Money, Voice, Messages?')
            return
        }
        let fir = await message.guild.members.cache.find(val => val.id == r[0].name)
        if(fir) {
            fir = fir
        }
        else {
            fir = 'Пользователь покинул сервер ' + r[0].name
        }
        let sec = await message.guild.members.cache.find(val => val.id == r[1].name)
        if(sec) {
            sec = sec
        }
        else {
            sec = 'Пользователь покинул сервер ' + r[1].name
        }
        let thr = await message.guild.members.cache.find(val => val.id == r[2].name)
        if(thr) {
            thr = thr
        }
        else {
            thr = 'Пользователь покинул сервер ' + r[2].name
        }
        em.addField('1. ' + r[0].valiii +  ' ' + kavo,  fir)
        em.addField('2. ' + r[1].valiii+  ' '+ kavo, sec)
        em.addField('3. ' + r[2].valiii+  ' '+ kavo, thr)
        message.channel.send({embed:em})

    }
    catch (err) {
        console.log(err)
    }

}
module.exports.help = {
    name: 'top',
    aliases:["топ"],
    help:'Топ по коинам/сообщениям/войсу. !top voice|messages|money',

    admin : true}