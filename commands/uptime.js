const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const Jimp = require('jimp');
const talkedRecently = new Set();
const MongoClient = require('mongodb').MongoClient;

//let r = await awaitmongo(url, dbName, 'find', 'xp', {name: member.id})
const awaitmongo = require('awaitmongodb')

module.exports.run = async (client, message, args, talkedRecently, talkedRecently2) =>
{
    if (message.author.id != '190183161425035285') return

    try {
        let uptime1 = client.uptime / 1000
        let uptimehour = uptime1 / 3600
        uptimehour = uptimehour - (uptimehour % 1)
        let uptimeminute = uptime1 / 60 - uptimehour * 60
        uptimeminute = uptimeminute - (uptimeminute % 1)
        uptimesec = uptime1 - uptimehour * 3600 - uptimeminute * 60
        uptimesec = uptimesec - (uptimesec % 1)
        message.channel.send(uptimehour + " часов " + uptimeminute + " минут " + uptimesec + " секунд")    }
    catch (err) {
        console.log(err)
    }
}
module.exports.help = {
    name: 'uptime',
    aliases:["аптайм"]}