const config = require("./config.json");

const Discord = require('discord.js')
const MongoClient = require('mongodb').MongoClient;
const url2 = config.url2;
const url = config.url
const dbName = config.dbName
//let r = await awaitmongo(url, dbName, 'find', 'xp', {name: member.id})
const awaitmongo = require('awaitmongodb')
module.exports.run = async (client, member, vhodenabl) =>
{
    console.log('adding')
    var gul = client.guilds.cache.find(val => val.id === config.guild)
    var chnl = gul.channels.cache.find(val => val.id  === config.privetchannel)
    let nam
    if (member.nickname == undefined) {
        nam=member.user.username
    }
    else {
        nam = member.nickname
    }
    if (nam.length > 14) {
        nam = nam.substr(0,13)
    }
let  des =  'Приветствуем тебя на нашем сервере! \n' +
    'Здесь ты узнаешь много нового и найдёшь себе общение по душе.\n' +
    '\n' +
    'Стой! Стой! Стой!\n' +
    '\n' +
    'Не торопись в гущу событий.\n' +
    'Прежде чем перейти к голосовым и текстовым каналам, ознакомься с этим местом получше, а в этом мы тебе поможем.\n' +
    'Вот тебе источники дополнительной информации по нашему серверу:'
    let r = await awaitmongo(url, dbName, 'find', 'xp', {name: member.id})

    if (r[0] == undefined) {
        let r = await awaitmongo(url, dbName, 'insertOne', 'xp', {name: member.id, xp:1, lvl:1, coins:1, messages:0, onlined:0, para:"false",vk:"false",about:"false"})
    }
    else {
des = 'Вновь приветствуем тебя на нашем сервере! \n' +
    'С возвращением!\n' +
    'Не торопись в гущу событий.\n' +
    'Прежде чем перейти к голосовым и текстовым каналам, вспомни это место\n' +
    'Не забудь повторить всё о нашем сервере!: '
    }
async function dsds() {
    let embed = new Discord.MessageEmbed()
        .setTitle("Поприветствуем " + nam + " в империи Юни!")
        .setAuthor('Привет!', client.user.avatarURL())
        .setDescription(des)
        .setColor(0xf442e2)
        .addField('Вся информация о нашем сервере:', '<#667741908315144203>')
        .addField('\u200b', '\u200b')
        .setTimestamp()
        .setImage(member.user.avatarURL())
        .setFooter('Привет, ' + nam)
    let cccc = await member.guild.channels.create(member.user.tag, {type : 'text',parent:config.protectcategory})
   await cccc.createOverwrite(member,{'VIEW_CHANNEL':true, 'READ_MESSAGE_HISTORY': true,  ADD_REACTIONS: true})
   let cheee  = await cccc.send(`${member}` +  ' пожалуйста, подтверди, что ты не бот, нажав на галочку под этим сообщением!')
    let aw = await chnl.send(member,{embed})
    if (vhodenabl.iff == true)  {
    cheee.react(config.emojiid)

    }
    console.log(vhodenabl.iff  + ' входенаблл')
    var filter = (reaction, user) => user.id == member.id
    var collector = cheee.createReactionCollector(filter, {time: 180000});
    collector.on('collect', r =>{
        collector.stop()
        member.roles.add(config.mainrole)

    })
    collector.on('end', (ss, nn) => {
        if(nn !='user') {
            member.kick()
    }
        cccc.delete()
    })
}
    dsds()
if(r[0].unmute != undefined && r[0].unmute >1579351943865) {
    member.setMute(true)
    member.roles.add(config.muteroleid)
}

}
