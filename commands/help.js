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
    try {
        if (!message.member.roles.cache.some(r => config.adminroles.includes(r.id)) && !message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MANAGE_MESSAGES'))
        {        let str = ''
        client.commands.forEach((el) =>{
            if(!el.help.admin) {
                if(el.help.help != undefined){
            str = str + el.help.name + ' - ' + el.help.help + ' \n \n '}
        }
    })
        message.reply(str)
    } else{
            let str = ''
            client.commands.forEach((el) =>{
                if(el.help.help != undefined){
                    str = str + el.help.name + `|` + el.help.aliases.join('|') +' - ' + el.help.help + '\n \n'}

        })
            message.author.send(str)
        }
    }
    catch (err) {
        console.log(err)
    }
}
module.exports.help = {
    name: 'help',
    aliases:["помощь"]}