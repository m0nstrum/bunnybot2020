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
let fliprecently = new Set()

module.exports.run = async (client, message, args, talkedRecently, talkedRecently2) =>
{

    try {
        if(fliprecently.has(message.author.id)) {
            message.channel.send("Кулдан данной команды составляет 15 секунд,  " + `${message.member}`);
            return
        }

        let query = {name: message.author.id}
        var result = await awaitmongo(url, dbName, 'find', 'xp', query)
        if(result[0] == undefined || result[0] == null) {
            console.log('net v baze')
            return
        }
        else {
            if(result[0].coins == undefined || result[0].coins == null) {
                message.reply('У вас нет монет(')
            }
            else {
                let mon = parseInt(args[0])
                if(isNaN(mon)) {return}
                if(mon > result[0].coins) {
                    message.reply('У вас недостаточно денег!')
                    return
                }
                if(mon > 1000) {
                    message.reply('Максимальная ставка - 1000!')
                    console.log('returning')
                    return
                }
                if(mon <1) {
                    return
                }
                fliprecently.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    fliprecently.delete(message.author.id);
                }, 15000);
                let man

                man = await randd()
                let winned = 0
                if(man) {
                    winned = mon *2
                    winned = Math.round(winned)

                    message.reply('Вы выиграли ' + winned + ' коинов')

                } else {
                    message.reply('Вы проиграли(')
                }


                let dddd = result[0].coins
                dddd = Math.round(dddd)
                let nev = {$set: {coins: dddd + winned - mon}}
                awaitmongo(url, dbName, 'updateOne', 'xp', query, nev )
            }
        }

    }

    catch (err) {
        console.log(err)
    }
    async function randd() {
        let toret = await Math.floor(Math.random() * (40 - 1 + 1)) + 1
        if(toret < 22 ) {
            toret = false
        }
        else {
            toret = true
        }
        return toret
    }
}
module.exports.help = {
    name: 'flip',
    aliases:["бросок"],
    admin: false,
    help:'Бросок монеты. !flip 10'}