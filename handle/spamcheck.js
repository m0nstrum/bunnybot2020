const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const Jimp = require('jimp');
const config = require("./config.json");

const talkedRecently = new Set();
const MongoClient = require('mongodb').MongoClient;
const url2 = config.url2;
const url = config.url
const dbName = config.dbName
//let r = await awaitmongo(url, dbName, 'find', 'xp', {name: member.id})
const awaitmongo = require('awaitmongodb')

module.exports.run = async (client, message, capswar) =>
{
    if (message.member.roles.cache.some(r => config.adminroles.includes(r.id)) && !message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MANAGE_MESSAGES'))
    {return}
        if(message.content.length > 7) {
    let prec = await percofcaps(message)
    if(prec > 0.6) {
        message.delete()
        if(capswar.has(message.author.id)) {
            message.member.roles.add(config.muteroleid)
            let unmutetime = Date.now()
            unmutetime = unmutetime + 1800000
            awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id},{$set: {unmute:unmutetime}} )
            awaitmongo(url, dbName, 'insertOne', 'mutes', {name: message.author.id, reason:'Капс', unmute:unmutetime, given:client.user.id})
            capswar.delete(message.author.id)
            message.author.send('Поздравляю! Ты получил мут за капс. Мут длится 30 минут. В следующий раз соблюдай правила!')
        }
else {
            message.reply('Не капси! Иначе получишь мут')

            capswar.add(message.author.id)
            var suka = setTimeout(function() { capswar.delete(message.author.id) }, 300000);

        }
    }
}
}
async function percofcaps(message) {
    let value = message.content.replace(/\s/g, '')
    var length = value.length;
    var checker = value.split('')
    if(checker.length < 5) {
        return 0
    }
    // A string with a length of 0 will obviously have no caps.
    if (!length) {
        return 0;
    }

    var caps = 0;
    var index = -1;
    while (++index < length) {
        var chr = value.charAt(index);
        if (chr.toLowerCase() !== chr && chr.toUpperCase() === chr) {
            caps++;
        }
    }

    return caps / length;
}