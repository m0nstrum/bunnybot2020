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
const awaitmongo = require('awaitmongodb')
//let r = await awaitmongo(url, dbName, 'find', 'xp', {name: member.id})


module.exports.run = async (client, message, args, talkedRecently, talkedRecently2, cooldwns) =>
{

    try {
        if(cooldwns[0].has(message.author.id))  {
            let em = new Discord.MessageEmbed()
            //.setTitle('Ваш ежедневный бонус: 300')
            //.setDescription('Текущий баланс: ' + nco )
                .setTitle("Кулдаун этой команды: 3 часа")
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
                .setColor(16726590)
            message.channel.send(em)
        }
        else {


            var tomute = message.mentions.members.first()
            if(!tomute) return message.reply('Вы никого не упомянули')
            let r = await awaitmongo(url, dbName, 'find', 'xp', {name: message.member.id})
            let d = await awaitmongo(url, dbName, 'find', 'xp', {name: tomute.id})
            if(r[0] == undefined) return;
            if(d[0] == undefined) return;
            let su  =  parseInt(args[1])
            if(isNaN(su)|| su <1  || su > r[0].coins) {
                message.reply('Неправильная сумма!')
                return
            }
            if(isNaN(d[0].coins)) return;
            awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id},  { $set: {coins: r[0].coins - su}})
            awaitmongo(url, dbName, 'updateOne', 'xp', {name: tomute.id},  { $set: {coins: d[0].coins + su}})
            let em = new Discord.MessageEmbed()
            //.setTitle('Ваш ежедневный бонус: 300')
            //.setDescription('Текущий баланс: ' + nco )
                .setDescription(`${message.member}` + ' передал ' + su + '🐰 ' + `${tomute}`)
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
                .setColor(16236543)
            message.channel.send(em)
            cooldwns[0].add(message.author.id)
            setTimeout(() => {
                cooldwns[0].delete(message.author.id)
            },10800000)

        }
    }
    catch (err) {
        console.log(err)
    }
}
module.exports.help = {
    name: 'give',
    aliases:["гив","дать",'transfer','передать'],
    help:"Передача денег другому пользователю. Кулдаун 3 часа. Пример: !give @kva 300"}