const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const config = require("./config.json");

const Jimp = require('jimp');
const talkedRecently = new Set();
const MongoClient = require('mongodb').MongoClient;
const url2 = config.url2;
const url = config.url
const dbName = config.dbName
//let r = await awaitmongo(url, dbName, 'find', 'xp', {name: member.id})
const awaitmongo = require('awaitmongodb')

module.exports.run = async (client, message, args, talkedRecently, talkedRecently2) =>
{
    try {
        let r = await awaitmongo(url, dbName, 'find', 'xp', {name: message.member.id})
        if(r[0].timing == undefined || r[0].timing < Date.now()) {
            let cdw  = Date.now()
            cdw = cdw + 21600000
            let nco =  r[0].coins
            if (isNaN(nco)) {
            	nco = 1
            }
            nco  = nco + 75
            awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id}, {$set:{ timing: cdw, coins: nco}})
            let em = new Discord.MessageEmbed()
                //.setTitle('Ваш ежедневный бонус: 75')
                //.setDescription('Текущий баланс: ' + nco )
                .addField('Ежедневный бонус:', '```75🐰```', true)

                .addField('Текущий баланс:', '```' +nco + '🐰```', true)
                .setFooter(message.author.tag, message.author.avatarURL())
                .setTimestamp()
                .setColor(16236543)
            message.channel.send(em)

        }
        else if(r[0] == undefined) {
            let cdw  = Date.now()
            cdw  = cdw + 21600000
            let n =  awaitmongo(url, dbName, 'insertOne', 'xp', {name: message.member.id, xp:1, lvl:1, coins:301, messages:0, onlined:0, para:"false", vk:"false", about:"false", boxes:0, timing: cdw})
            let em = new Discord.MessageEmbed()
                .setDescription('Ваш ежедневный бонус: 75' + ' \n Текущий баланс: 76' )
                .setFooter(message.author.tag, message.author.avatarURL())
                .setTimestamp()
                .setColor(16236543)
            message.channel.send(em)
        }
        else {
            let rs = r[0].timing
            rs = rs - Date.now()
            let uptime1 = rs/ 1000
            let uptimehour = uptime1 / 3600
            uptimehour = uptimehour - (uptimehour % 1)
            let uptimeminute = uptime1 / 60 - uptimehour * 60
            uptimeminute = uptimeminute - (uptimeminute % 1)
            uptimesec = uptime1 - uptimehour * 3600 - uptimeminute * 60
            uptimesec = uptimesec - (uptimesec % 1)
            let em = new Discord.MessageEmbed()
            //.setTitle('Ваш ежедневный бонус: 75')
            //.setDescription('Текущий баланс: ' + nco )
                .setTitle('Кулдаун! Осталось ' + uptimehour + " ч " + uptimeminute + " м " + uptimesec + " с" )
                .setFooter(message.author.tag, message.author.avatarURL())
                .setTimestamp()
                .setColor(16726590)
            message.channel.send(em)
        }
    }
    catch (err) {
        console.log(err)
    }
}
module.exports.help = {
    name: 'bunnycoin',
    aliases:["кронета", 'kroneta', 'timely', 'daily', 'кронетп','крионета'],
    help:'Ежедневный бонус!'}