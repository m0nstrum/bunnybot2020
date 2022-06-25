const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const Jimp = require('jimp');
const talkedRecently = new Set();
const config = require("./config.json");

module.exports.run = async (client, message, args, talkedRecently, talkedRecently2) =>
{
    if (!message.member.roles.cache.some(r => config.adminroles.includes(r.id)) && !message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MANAGE_MESSAGES'))
    return message.reply("```У тебя нет прав для этого.```")
    var deleteCount = args[0]
    deleteCount = parseInt(deleteCount)
    deleteCount = deleteCount + 1
if(message.channel.id == config.logschannel || message.channel.id == config.adminchannel) {
    message.reply('Нельзя удалить сообщение в этом канале!')
    return
}
    if (!deleteCount || deleteCount < 2 ) {
        return
    }
    if (deleteCount > 100) {
        deleteCount = 100

    }

    message.channel.bulkDelete(deleteCount)
        .catch(error => message.reply(`Не могу удалить сообщения из-за ошибки: ${error}`)
)
    ;
}
module.exports.help = {
    name: 'clear',
    aliases:["клир"],
    admin: true,
    help:'Очистка чата до 99 сообщений. Не работает на сообщения, которым больше 14 дней. !clear 99'}