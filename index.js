const Discord = require('discord.js');
const express = require('express');
const app = express();
const http = require('http');
const https = require('https');

var bot = new Discord.Client();
var prefix = ("&");

bot.on('ready', () => {
  bot.user.setActivity(`${bot.user.username} le rigolo | &blague`, { type: 'WATCHING' });
console.log("Bot prêt !");
});

bot.login(process.env.BOT_TOKEN);

bot.on('message', message => {
    if(message.content === prefix + "blague")
{
    
    https.get('https://bridge.buddyweb.fr/api/blagues/blagues', (res) => {
        const {statusCode} = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);

        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {rawData += chunk;
})
    ;
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
    //console.log(parsedData);
    let rand = Math.floor(Math.random() * (parsedData.length));
    //console.log(parsedData[rand])
    message.reply(parsedData[rand].blagues)
    .then(()=> {
        console.log('Bot:Blague faîte');
    });
} catch
    (e)
    {
        console.error(e.message);
    }
})
    ;
}).
    on('error', (e) => {
        console.error(`Got error: ${e.message}`);
})
    ;

//message.reply(reply);
    
}
});
