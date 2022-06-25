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
    if (!message.member.roles.cache.some(r => config.adminroles.includes(r.id)) && !message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MANAGE_MESSAGES'))
    return message.reply("```У тебя нет прав для этого.```")
    try {
        var tomute = message.mentions.members.first()
        let unmutetime
        if(!tomute) return message.reply('Вы никого не упомянули')
       // if (args.length > )
        if (tomute.roles.cache.some(r => config.adminroles.includes(r.id)) && message.member.permissions.has('ADMINISTRATOR') && message.member.permissions.has('MANAGE_MESSAGES'))
            return message.reply("```Вы пытаетесь замутить администратора...```")
        let tim = parseInt(args[1])
        let tip = args[2]
        let mno = 1000
        let reason = args.slice(3).join(' ')
        if (tip == 's' || tip == 'с' || tip == 'c') {
            mno= 1000
        }
        else if (tip == 'm'|| tip =='м') {

            mno = 60000
        }
        else if (tip == 'h'|| tip =='ч') {
            mno = 3600000
        }
        else if (tip  == 'd'|| tip =='д') {
            mno = 86400000
        }
        else {
            mno = 60000
             reason = args.slice(2).join(' ')

        }
        if  (isNaN(tim)) {
            tim =1879348722000
             reason = args.slice(1).join(' ')

        }  else {
            tim = Date.now() + tim*mno
        }
        unmutetime =  new Date(tim)
        let namka = tomute.nickname
        if(!namka) namka = tomute.user.username
        let lastmutesc = await awaitmongo(url, dbName, 'find', 'mutes', {name: tomute.id})
        tomute.voice.setMute(true)
        tomute.roles.add(config.muteroleid)
        if (!lastmutesc[0]) {

        let em = new Discord.MessageEmbed()
            .setAuthor('Пользователю ' +  'был выдан мут.',tomute.user.avatarURL())
            .setDescription(`${tomute}` + ', добро пожаловать в карцер!')
            .addField('По причине:', reason)
            .addField('Размут:', unmutetime )
            .addField('Мут выдал:', message.member)
            .setFooter(message.author.tag, message.author.avatarURL())
            .setTimestamp()
            .setColor(16726590)
        message.channel.send(em)

            awaitmongo(url, dbName, 'insertOne', 'mutes', {name: tomute.id, reason:reason, unmute:tim, given:message.author.id})

        }
        else {
            let unmutetimeold = new Date(lastmutesc[0].unmute)
            let em = new Discord.MessageEmbed()
                .setAuthor('Пользователю ' +  'была изменена длительность мута.',tomute.user.avatarURL())
                .setDescription(`${tomute}` + ', тебе сменили длительность мута!')
                .addField('По причине:', reason)
                .addField('Новая дата размута:', unmutetime )
                .addField('Старая дата размута:', unmutetimeold)
                .addField('Мут обновил:', message.member)
                .setFooter(message.author.tag, message.author.avatarURL())
                .setTimestamp()
                .setColor(16726590)
            message.channel.send(em)

            awaitmongo(url, dbName, 'updateOne', 'mutes', {name: tomute.id}, {$set: {reason:reason, unmute:tim, given:message.author.id}})

        }
        awaitmongo(url, dbName, 'updateOne', 'xp', {name: tomute.id},{$set: {unmute:tim}} )

    }
    catch (err) {
        console.log(err)
    }
}
module.exports.help = {
    name: 'mute',
    aliases:["мут"],
    admin: true,
    help:'!mute @пользователь время причина. !mute @пидорас 3 д а потому что пидорас. - даст мут пидорасу на 3 дня по причине "а потому что пидорас" \\n Насчет указания времени. Буквы после цифры (в примере "3 д") м - минуты, ч - часы, д - дни(писать через пробел после цифр!!!)'}