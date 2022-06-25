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
let wheelrecently = new Set()
module.exports.run = async (client, message, args, talkedRecently, talkedRecently2) =>
{

    try {
        if(wheelrecently.has(message.author.id)) {
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
                mon = Math.abs(mon)
                if(mon > result[0].coins) {
                    message.reply('У вас недостаточно денег!')
                    return
                }
                if(mon > 1000) {
                    message.reply('Максимальная ставка - 1000!')
                    console.log('returning')
                    return
                }
                wheelrecently.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    wheelrecently.delete(message.author.id);
            }, 15000);
                let man
                    if (!message.member.roles.cache.some(r => config.adminroles.includes(r.id)) && !message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MANAGE_MESSAGES')) {// подкрут для администрации сервера....
                 man = await randomikus()
                             	               if(result[0].coins > 10000) {
            	man = await randomikusminus()
           			 }

           			if(result[0].coins< 499) {
           				man = await randomikuspod()
           			}
            }
            else {
            	   man = await randomikuspod()


            }

                let ar = await arrowww(man)
                let winned = man * mon
                winned = Math.round(winned)
                let embed = new Discord.MessageEmbed()
                    .setTitle('  『1,5』   『5』 『0,1』\n' +
                        '\n' +
                        '『1,25』    ' +  ar + '      『0,25』\n' +
                        '\n' +
                        '  『1』   『0,75』『0,5』')
                    .setColor(0x00bfff)
                message.reply('Вы выиграли ' + winned + ' коинов',{embed})
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
    async function arrowww(mnozh) {
    if(mnozh == 1.5) {
        return ':arrow_upper_left:'
    }
    else if( mnozh == 5) {
        return ':arrow_up:'
    }
    else if (mnozh == 0.1) {
        return ':arrow_upper_right:'
    }
    else if (mnozh == 0.25) {
        return ':arrow_right:'
    }
    else if (mnozh == 0.5) {
        return ':arrow_lower_right:'
    }
    else if(mnozh == 0.75) {
        return ':arrow_down:'
    }
    else if(mnozh == 1) {
        return ':arrow_lower_left:'
    }
    else if(mnozh == 1.25) {
        return ':arrow_left:'
    }
}
    async function randomikus() {
    let toret = await Math.floor(Math.random() * (37 - 1 + 1)) + 1
    if(toret == 1) {
        return 5
    }
    else if(toret == 2) {
        return 0.25
    }
    else if(toret == 3) {
        return 0.5
    }
    else if(toret == 4) {
        return 0.75
    }
    else if(toret == 5) {
        return 1
    }
    else if(toret == 6) {
        return 1.25
    }
    else if(toret == 7) {
        return 1.5
    }
    else if(toret == 8) {
        return 0.1
    }
    else if(toret == 9) {
        return 0.1
    }
    else if(toret == 10) {
        return 0.1
    }
    else {
        return 0.5
    }

}
    async function randomikusminus() {
    	console.log('minus' + message.author.id)
    let toret = await Math.floor(Math.random() * (90 - 1 + 1)) + 1
    if(toret == 1) {
        return 5
    }
    else if(toret == 2) {
        return 0.25
    }
    else if(toret == 3) {
        return 0.5
    }
    else if(toret == 4) {
        return 0.75
    }
    else if(toret == 5) {
        return 1
    }
    else if(toret == 6) {
        return 1.25
    }
    else if(toret == 7) {
        return 1.5
    }
    else if(toret == 8) {
        return 0.1
    }
    else if(toret == 9) {
        return 0.1
    }
    else if(toret == 10) {
        return 0.1
    }
    else {
        return 0.5
    }

}
async function randomikuspod() {
	console.log('pudrkut' + message.author.id)
    let toret = await Math.floor(Math.random() * (15 - 1 + 1)) + 1
    if(toret == 1) {
        return 5
    }
    else if(toret == 2) {
        return 0.25
    }
    else if(toret == 3) {
        return 0.5
    }
    else if(toret == 4) {
        return 0.75
    }
    else if(toret == 5) {
        return 1
    }
    else if(toret == 6) {
        return 1.25
    }
    else if(toret == 7) {
        return 1.5
    }
    else if(toret == 8) {
        return 1.25
    }
    else if(toret == 9) {
        return 1.5
    }
    else if(toret == 10) {
        return 5
    }
    else {
        return 0.75
    }

}
}
module.exports.help = {
    name: 'wheel',
    aliases:["колесо",'фортуна'],
	help:'Беспроигрышная лотерея. Как минимум часть вашей ставки всегда возвращается, а если повезет, то вы сорвете куш!'}