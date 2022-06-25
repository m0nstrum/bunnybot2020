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
    if (message.author.id != '190183161425035285') return

try {
        message.reply('экзампл')
}
catch (err) {
        console.log(err)
}
}
module.exports.help = {
    name: 'example',
    aliases:["экзампл"]}