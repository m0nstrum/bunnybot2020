const Discord = require('discord.js')
const { Client } = require('discord.js');

const client = new Client();
const utul = Discord.Util
const Jimp = require('jimp');0.0
var mongo = 'gfdghdsfg'
var activ
var opus = require('node-opus');
var rate = 44100;
var encoder = new opus.OpusEncoder( rate );
const config = require("./config.json");

const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const VkBot = require('node-vk-bot-api')
const bot = new VkBot('config.vktoken')
const Markup = require('./node_modules/node-vk-bot-api/lib/markup.js')
const alerts = new Set();
const alertstwo = new Set();
const getUrls = require('get-urls')
var UrlPattern = require('url-pattern');
var patternone = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)')
const urlRegex = require('url-regex');
const fs = require("fs")
const MongoClient = require('mongodb').MongoClient;
const url2 = config.url2;
const url = config.url
const dbName = 'heroku_zhj755k4';
var translate = require('yandex-translate')(config.yandexkey);
const talkedRecently = new Set();
const talkedRecently2 = new Set();
var capswar = new Set()
const apiai = require('apiai');
const app = apiai(config.apiai);
const addhandle  = require('./handle/add.js')
const voicestatehandle  = require('./handle/stateupdate.js')
const spamchecker = require("./handle/spamcheck.js")
var vhodenabl = {iff:true}

async function whatdialog(ctx) {
    let data = new Date()
    var request = await app.textRequest(ctx.message.text, {
        sessionId: ctx.message.peer_id + data.getFullYear() + data.getDate() + data.getMonth()
    });

    request.on('response', async function(response) {
        ctx.reply( response.result.fulfillment.speech + " <br>   (ответ бота)")
    });

    request.on('error', function(error) {
        console.log(error);
    });

    request.end();

}

const { ShardingManager } = require('discord.js');
const awaitmongo = require('awaitmongodb')
var anchorme = require("anchorme").default
var givecd = new Set()
let cooldwns = [givecd]
const settings = require('./config.json')
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./commands/', (err,files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split('.').pop() === 'js')
if(jsfile.length <= 0) {
    console.log('нечего грузить')
    return
}
jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    console.log(`${f} loaded`)
    client.commands.set(props.help.name, props)
    if (props.help.aliases != undefined) {
    props.help.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);

});
    }
})})

client.login(config.token);



client.on('message', async message =>  {
    if (message.channel.type=='dm') return
    if(message.content.indexOf(config.prefix) !==0) {
        if(message.author.bot) return

        let chh = message.guild.channels.cache.find(val => val.id == config.logschannel)
        let embed = new Discord.MessageEmbed()
            .setTitle(message.content)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(16236543)
            .setTimestamp()
            .setFooter(message.channel.name)
        let  atta = message.attachments.array()
        if(message.attachments.array()[0] != undefined) {
            embed.setImage(atta[0].url)
        }
        chh.send({embed})
        spamchecker.run(client, message, capswar)
        let r = await awaitmongo(url, dbName, 'find', 'xp', {name: message.member.id})
        if (r[0] == undefined) return;
        let msga  = r[0].messages
        if(isNaN(msga)) {
        	msga  = 0
        }
        msga = msga  + 1
        awaitmongo(url,  dbName, 'updateOne', 'xp', {name: message.member.id}, {$set:{messages:msga}})
        return}
const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
const command = args.shift().toLowerCase()
let commandfile = client.commands.get(command)
if(commandfile) {
    try {
        commandfile.run(client,message, args, cooldwns, cooldwns, cooldwns, vhodenabl)
    }
    catch(err) { console.log(err)}
}
else {
    commandfile = client.aliases.get(command)
    if (commandfile) {
        commandfile = client.commands.get(commandfile)
        try {
            commandfile.run(client,message, args, cooldwns, cooldwns, cooldwns, vhodenabl)
        }
        catch(err) { console.log(err)}    }

}
})

client.on('ready', async () => {
    console.log(`Выполнен вход за... ${client.user.tag}!`);
client.user.setPresence({ activity: { name: 'Minecraft', type:'PLAYING' }, status: 'online' })
    .then(presence => console.log(`Активность установлена на ${presence.activities ? presence.activities.name : 'Minecraft'}`))
client.setInterval(async ()=> {
    let muts = await awaitmongo(url, dbName, 'find', 'mutes', {})
    let nowtime = Date.now()
if(muts[0] == undefined) returzn
muts.forEach(async function (i) {
    if (i.unmute < nowtime) {
        let  guil = client.guilds.cache.find(guild => guild.id == config.guild)
        let us = guil.members.cache.find(memb => memb.id == i.name)
        if(!us) return
        let ch= guil.channels.cache.find(chh => chh.id == config.mainchannel)
        us.voice.setMute(false)
        us.roles.remove(config.muteroleid)
        awaitmongo(url, dbName, 'deleteOne', 'mutes', {name: us.id})
        awaitmongo(url, dbName, 'updateOne', 'xp', {name: us.id}, {$set:{unmute:1579351943863}})
        if(ch) {
            let  givenb = guil.members.cache.find(mmm => mmm.id == i.given)
            let em = new Discord.MessageEmbed()
                .setAuthor('Пользователь ' +  'был размучен',us.user.avatarURL)
                .setDescription(`${us}` + ', с возвращением!')
                .addField('Причина мута:', i.reason)
                .addField('Мут выдал:', givenb)
                .setFooter(client.user.username, client.user.avatarURL)
                .setTimestamp()
                .setColor(7339862)
            ch.send(em)
        }
    }

})
},25000)
awaitmongo(url, dbName, 'deleteMany', 'channels', {})

});

client.on("guildMemberAdd", (member) => {
    console.log('member add')
    if (member.guild.id !=  config.guild) return;
addhandle.run(client, member, vhodenabl)
});

client.on('message', message => {
    if (message.channel.type =='dm') return;
    if (message.guild.id !=  config.guild) return
if (!(!message.member.roles.cache.some(r => config.adminroles.includes(r.id)) && !message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MANAGE_MESSAGES')))
{
    return
}

    let urlscheck = urlRegex({strict: false}).test(message.content);
    if (urlscheck  ==   true) {
async function urlka() {


            let che  = await anchorme(message.content, {list:true})
            if(che[0]  == undefined) {
                let tip  = getUrls(message.content)
                tip = Array.from(tip)
                message.delete()
                message.member.roles.add(config.muteroleid)
                message.author.send('В вашем сообщение обнаружена ссылка! Возможно это реклама. Для размута напишите администрации.')
                let ch =  message.guild.channels.cache.find(chh => chh.id == config.adminchannel)
            ch.send(message.author.tag + ' ' +`${message.member}` + ' возможно рекламирует что-то! Текст его сообщения:'+ message.content)
                awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id},{$set: {unmute:1879348722000}} )
                awaitmongo(url, dbName, 'insertOne', 'mutes', {name: message.author.id, reason:'Ссылка', unmute:1879348722000, given:client.user.id})
                return

            }
            let sit= await patternone.match(che[0].raw)
            if (!sit) {
                message.delete()
                message.member.roles.add(config.muteroleid)
                message.author.send('В вашем сообщение обнаружена ссылка! Возможно это реклама. Для размута напишите администрации.')
                let ch =  message.guild.channels.cache.find(chh => chh.id == config.adminchannel)
            ch.send(message.author.tag + ' ' +`${message.member}` + ' возможно рекламирует что-то! Текст его сообщения:'+ message.content)
                awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id},{$set: {unmute:1879348722000}} )
                awaitmongo(url, dbName, 'insertOne', 'mutes', {name: message.author.id, reason:'Ссылка', unmute:1879348722000, given:client.user.id})
                return
            }
            if ((sit.domain == 'vk' && sit.tld == 'com') || (sit.domain =='tenor' &&  sit.tld == 'com') || (sit.domain  == 'gfycat' && sit.tld == 'com') || (sit.domain  == 'instagram' && sit.tld == 'com') ) {
                return
            }


            message.delete()
            message.member.roles.add(config.muteroleid)
            message.author.send('В вашем сообщение обнаружена ссылка! Возможно это реклама. Для размута напишите администрации.')
            let ch =  message.guild.channels.cache.find(chh => chh.id ==config.adminchannel)
            ch.send(message.author.tag + ' ' +`${message.member}` + ' возможно рекламирует что-то! Текст его сообщения:'+ message.content)
            awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id},{$set: {unmute:1879348722000}} )
            awaitmongo(url, dbName, 'insertOne', 'mutes', {name: message.author.id, reason:'Ссылка', unmute:1879348722000, given:client.user.id})


        }
        urlka()
        }
    else  {
        let chea = anchorme(message.content, {list:true})
        if(chea[0] != undefined) {
            async function urlka2() {


                let che  = await getUrls()
                che = Array.from(che)
                let sit= await patternone.match(chea[0].raw)
                if (!sit) {
                    message.delete()
                    message.member.roles.add(config.muteroleid)
                    message.author.send('В вашем сообщение обнаружена ссылка! Возможно это реклама. Для размута напишите администрации.')
                    let ch =  message.guild.channels.cache.find(chh => chh.id == config.adminchannel)
            ch.send(message.author.tag + ' ' +`${message.member}` + ' возможно рекламирует что-то! Текст его сообщения:'+ message.content)
                    awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id},{$set: {unmute:1879348722000}} )
                    awaitmongo(url, dbName, 'insertOne', 'mutes', {name: message.author.id, reason:'Ссылка', unmute:1879348722000, given:client.user.id})
                    return
                }
                if ((sit.domain == 'vk' && sit.tld == 'com') || (sit.domain =='tenor' &&  sit.tld == 'com') || (sit.domain  == 'gfycat' && sit.tld == 'com') || (sit.domain  == 'instagram' && sit.tld == 'com') ) {
                    return
                }


                message.delete()
                message.member.roles.add(config.muteroleid)
                message.author.send('В вашем сообщение обнаружена ссылка! Возможно это реклама. Для размута напишите администрации.')
                let ch =  message.guild.channels.cache.find(chh => chh.id == config.adminchannel)
            ch.send(message.author.tag + ' ' +`${message.member}` + ' возможно рекламирует что-то! Текст его сообщения:'+ message.content)
                awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id},{$set: {unmute:1879348722000}} )
                awaitmongo(url, dbName, 'insertOne', 'mutes', {name: message.author.id, reason:'Ссылка', unmute:1879348722000, given:client.user.id})


            }
            urlka2()
        }

    }


})


client.on('messageUpdate', (oldmessage, message) => {
    if (message.channel.type =='dm') return;
if (message.guild.id !=  config.guild) return
if (!(!message.member.roles.cache.some(r => config.adminroles.includes(r.id)) && !message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MANAGE_MESSAGES')))
{
    return
}
console.log('msg updated')
let urlscheck = urlRegex({strict: false}).test(message.content);
if (urlscheck  ==   true) {
    async function urlka() {



        let che  = await anchorme(message.content, {list:true})
        let sit= await patternone.match(che[0].raw)
        if ((sit.domain == 'vk' && sit.tld == 'com') || (sit.domain =='tenor' &&  sit.tld == 'com') || (sit.domain  == 'gfycat' && sit.tld == 'com') || (sit.domain  == 'instagram' && sit.tld == 'com') ) {
            return
        }


        message.delete()
        message.member.roles.add(config.muteroleid)
        message.author.send('В вашем сообщение обнаружена ссылка! Возможно это реклама. Для размута напишите администрации.')
        let ch =  message.guild.channels.cache.find(chh => chh.id == config.adminchannel)
            ch.send(message.author.tag + ' ' +`${message.member}` + ' возможно рекламирует что-то! Текст его сообщения:'+ message.content)
        awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id},{$set: {unmute:1879348722000}} )
        awaitmongo(url, dbName, 'insertOne', 'mutes', {name: message.author.id, reason:'Ссылка', unmute:1879348722000, given:client.user.id})


    }
    urlka()
}
else  {
    let chea = anchorme(message.content, {list:true})
    if(chea[0] != undefined) {
        async function urlka2() {


            let che  = await getUrls()
            che = Array.from(che)
            let sit= await patternone.match(chea[0].raw)
            if ((sit.domain == 'vk' && sit.tld == 'com') || (sit.domain =='tenor' &&  sit.tld == 'com') || (sit.domain  == 'gfycat' && sit.tld == 'com') || (sit.domain  == 'instagram' && sit.tld == 'com') ) {
                return
            }


            message.delete()
            message.member.roles.add(config.muteroleid)
            message.author.send('В вашем сообщение обнаружена ссылка! Возможно это реклама. Для размута напишите администрации.')
            let ch =  message.guild.channels.cache.find(chh => chh.id == config.adminchannel)
            ch.send(message.author.tag + ' ' +`${message.member}` + ' возможно рекламирует что-то! Текст его сообщения:'+ message.content)
            awaitmongo(url, dbName, 'updateOne', 'xp', {name: message.member.id},{$set: {unmute:1879348722000}} )
            awaitmongo(url, dbName, 'insertOne', 'mutes', {name: message.author.id, reason:'Ссылка', unmute:1879348722000, given:client.user.id})


        }
        urlka2()
    }

}


})


client.on("message", async message =>
{

    if(message.channel.type == "dm") return;
    if(message.guild.id == config.webhookguild) {
        console.log('guild')
        const trguild =await client.guilds.cache.find(chh => chh.id ==config.guild)
        const ch = await trguild.channels.cache.find(chh => chh.id == config.webhookchannel)
        if(message.author.id == '190183161425035285') return; // мой дискорд
        console.log('not me')
        if(message.content == 'stream') {
            console.log('stream???')

        }
        else  {
            console.log('video')
            let embed = new Discord.MessageEmbed()
                embed.setTitle( 'Новое видео!')
                embed.setColor(13111111)
                embed.setURL(message.content)
            ch.send('@everyone ' + message.content,{embed});
            async function vkuvedi() {
                let r = await awaitmongo(url, dbName, 'find', 'newvideo', {})
                r.forEach(async function(item)  {
                    bot.sendMessage(item.id, " Новое видео!: " + message.content)
                        

                })
            }
            vkuvedi()

        }
    }
    else {
        return
    }
})


bot.startPolling(() => {
    console.log('VKBot started.')
})
bot.command('Начать', (ctx) => {
    ctx.reply('Примешь синию таблетку - войдешь в страну чудес...', null, Markup
        .keyboard([

            [
                Markup.button('Подписаться', 'positive'),
                Markup.button('Отписаться', 'negative'),
            ],
            [
                Markup.button('Купить рекламу', 'primary'),
            ],
        ])
    )
})

bot.command('Подписаться', (ctx) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db(dbName);
        var query = { id: ctx.message.peer_id };
        dbo.collection("newvideo").find(query).toArray(function(err, result) {

            if (err) throw err;
            if((result[0] === undefined || result[0] === null)) {
                var dbo = db.db(dbName);
                var myobj = { id: ctx.message.peer_id };
                dbo.collection("newvideo").insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    ctx.reply('Ты успешно подписался на рассылку уведомлений о новых видео!')
                    db.close();
                });

                return}

            else {ctx.reply('Ты уже подписан на рассылку уведомлений!')
                return;}
        })
    });

})
bot.command('Купить рекламу', (ctx) => {
    ctx.reply('Рекламные предложения писать на почту: swuni@mail.ru')

})
bot.command('Отписаться', (ctx) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db(dbName);
        var query = { id: ctx.message.peer_id};
        dbo.collection("newvideo").find(query).toArray(function(err, result) {

            if (err) throw err;
            if((result[0] === undefined || result[0] === null)) {
                var dbo = db.db(dbName);
                var myobj = { id: ctx.message.peer_id };
                ctx.reply('Ты не подписан на нашу рассылку.')

                return}

            else {


                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db(dbName);
                    var myquery = { id: ctx.message.peer_id };
                    dbo.collection("newvideo").deleteOne(myquery, function(err, obj) {
                        if (err) throw err;
                        ctx.reply('Ты успешно отписался от рассылки уведомлений(')
                        db.close();
                    });
                });

                return;}
        })
    })
})

bot.on((ctx) => {
    let te = ctx.message.text
if(ctx.message.text != 'Начать' && te != 'Подписаться' && te != 'Отписаться' && te != 'Купить рекламу') {

    async function dontknown(ctx, bot) {
let resp = await whatdialog(ctx)
    }
    dontknown(ctx, bot)
}

})

client.on("guildMemberRemove", member =>{
    console.log('leave')
    let guildi=member.guild
    let ch= guildi.channels.cache.find(val=> val.id =="669544334571339786")
let em = new Discord.MessageEmbed()
    .setTitle("Пока, " +`${member}` + "(")
    .setColor(8092542)
    .setTimestamp()
    .setImage(member.user.avatarURL())
    .setFooter('Прощай, ' + member.user.tag)
ch.send(em)
})

client.on('voiceStateUpdate', async (oldMember, newMember) => {
	let oldUserChannel = oldMember.channel
    let newUserChannel = newMember.channel

	oldMember = oldMember.member

	newMember = newMember.member
    voicestatehandle.run(client, oldUserChannel, newUserChannel, oldMember, newMember)

})
client.on('warn', console.warn);

client.on('error', errorr => { console.log(errorr)});