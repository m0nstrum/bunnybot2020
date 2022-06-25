const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const Jimp = require('jimp');
const talkedRecently = new Set();

module.exports.run = async (client,message, args, cooldwns, s, b, vhodenabl) =>
{
try {
    if (message.author.id != '190183161425035285') return
    console.log('a'
    )
    let toev = args.join(" ");
    let d = eval(toev)
    if (typeof d !== "string")
        d = require("util").inspect(d);
    message.reply('выполнено')

}
catch (err) {
        console.log(err)
}
}
module.exports.help = {
    name: 'eval'}