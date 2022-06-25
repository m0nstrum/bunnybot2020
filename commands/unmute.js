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
        let r = await awaitmongo(url, dbName, 'find', 'mutes', {name: tomute.id})
        if(r[0]  == undefined) {
            message.reply('Пользователь не в муте!')
            return
        }
        let givenb  = message.guild.members.cache.find(val => val.id == r[0].given)

        tomute.voice.setMute(false)
        tomute.roles.remove(config.muteroleid)
        awaitmongo(url, dbName, 'deleteOne', 'mutes', {name: tomute.id})
        awaitmongo(url, dbName, 'updateOne', 'xp', {name: tomute.id}, {$set:{unmute:1579351943863}})
        let em = new Discord.MessageEmbed()
            .setAuthor('Пользователь ' +  'был размучен',tomute.user.avatarURL())
            .setDescription(`${tomute}` + ', с возвращением!')
            .addField('Причина мута:', r[0].reason)
            .addField('Мут выдал:', givenb)
            .addField('Мут снял:', message.member)
            .setFooter(message.author.tag, message.author.avatarURL())
            .setTimestamp()
            .setColor(7339862)
        message.channel.send(em)
        tomute.user.send(em)

    }
    catch (err) {
        console.log(err)
    }
}
module.exports.help = {
    name: 'unmute',
    aliases:["анмут"],
    admin:true,
    help:"!unmute @пользователь"}