const Discord = require('discord.js')
const client = new Discord.Client();
const Jimp = require('jimp');0.0
var mongo = 'gfdghdsfg'
var activ
const config = require("./config.json");
const VkBot = require('node-vk-bot-api')
const bot = new VkBot('config.vktoken')
const Markup = require('./node_modules/node-vk-bot-api/lib/markup.js')
const alerts = new Set();
const alertstwo = new Set();
const getUrls = require('get-urls')
var UrlPattern = require('url-pattern');
var patternone = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(\\::port)(/*)')
const fs = require("fs")
const MongoClient = require('mongodb').MongoClient;
const url2 = config.url2;
const url = config.url
const dbName = config.dbName
const urlRegex = require('url-regex');
var translate = require('yandex-translate')(config.yandexkey);
const talkedRecently = new Set();
const talkedRecently2 = new Set();
const apiai = require('apiai');
const app = apiai(config.apiai);
const { ShardingManager } = require('discord.js');
const settings = require('./config.json')
const manager = new ShardingManager('./bot.js', { token: settings.token });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Шард запущен: ${shard.id}`));