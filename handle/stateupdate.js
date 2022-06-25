const Discord = require('discord.js')
const MongoClient = require('mongodb').MongoClient;
const config = require("./config.json");

const url2 = config.url2;
const url = config.url
const dbName = config.dbName
//let r = await awaitmongo(url, dbName, 'find', 'xp', {name: member.id})
const awaitmongo = require('awaitmongodb')
module.exports.run = async (cclient, oldUserChannel, newUserChannel, oldMember, newMember) =>
{
		let oldUserChannelid = 0
		let newUserChannelid = 0
		if(oldUserChannel != null) {
			oldUserChannelid = oldUserChannel.id

		} 
		if(newUserChannel != null) {
			newUserChannelid = newUserChannel.id
		}
	console.log(newMember.voice.channelID)
if(newMember.voice.channelID === config.afkchannelid) {
    let r = await awaitmongo(url, dbName, 'find', 'channels', {name: newMember.id})
    if(r[0] == undefined) return console.log('what');
    if(oldUserChannelid != config.afkchannelid) {
        awaitmongo(url, dbName, 'deleteOne', 'channels', {name: newMember.id})
        let n = await awaitmongo(url, dbName, 'find', 'xp', {name: newMember.id})
        if(n[0] == undefined) return console.log('what');
        let nonli
        let sitted  = Date.now()
        sitted = sitted - r[0].time
        sitted = sitted/1000
        sitted = sitted/60
        sitted = sitted/60

        if(n[0].onlined == undefined) {
        nonli = sitted
        } else  {
         nonli = n[0].onlined
            nonli = nonli + sitted
        }
        let  addixp = nonli /10
        addixp = n[0].xp + addixp
        awaitmongo(url,dbName,'updateOne', 'xp',{name:newMember.id}, {$set: {onlined:nonli, xp:addixp}})    }
    console.log('афк')

    return
}
if(oldUserChannelid === config.afkchannelid && newMember.voice.channelID !=config.afkchannelid &&  newUserChannel !== null) {
    let r = await awaitmongo(url, dbName, 'find', 'channels', {name: newMember.id})
if(r[0] == undefined) {
    awaitmongo(url,  dbName, 'insertOne', 'channels',{name: newMember.id, time: Date.now()})
}
    console.log('Выход из афк')

return
}
    if(oldUserChannel == null && newUserChannel != null  && newMember.voice.channelID != config.adminchannel) {
        awaitmongo(url,  dbName, 'insertOne', 'channels',{name: newMember.id, time: Date.now()})
        console.log('присоеденился')

        return
    }
 if(newUserChannel == undefined && oldUserChannelid != config.afkchannelid){
        let r = await awaitmongo(url, dbName, 'find', 'channels', {name: newMember.id})
        if(r[0] == undefined) return  console.log('what');
        awaitmongo(url, dbName, 'deleteOne', 'channels', {name: newMember.id})
        let n = await awaitmongo(url, dbName, 'find', 'xp', {name: newMember.id})
        if(n[0] == undefined) return console.log('what');
        let nonli
        let sitted  = Date.now()
        sitted = sitted - r[0].time
        sitted = sitted/1000
        sitted = sitted/60
        sitted = sitted/60

        if(n[0].onlined == undefined) {
            nonli = sitted
        } else  {
            nonli = n[0].onlined
            nonli = nonli + sitted
        }
        let  addixp = nonli /10
        addixp = n[0].xp + addixp
        awaitmongo(url,dbName,'updateOne', 'xp',{name:newMember.id}, {$set: {onlined:nonli, xp:addixp}})
        console.log('покинул канал')

        return
    }

}