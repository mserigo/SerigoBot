
//({ appId: 'fdcdf197-2514-4131-8edb-61e5bfa8b7fb', appPassword: 'NN74S76qrmWbjmUeHKWQzWL' }); 

// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

var appId = process.env.MY_APP_ID || "Missing your app ID";
var appSecret = process.env.MY_APP_SECRET || "Missing your app secret"

/*
*/

// Create chat bot
var bot = new builder.BotConnectorBot
({ appId: process.env.MY_APP_ID, appSecret: process.env.MY_APP_SECRET }); 
bot.add('/', new builder.SimpleDialog( function (session){session.send('Hello World');}));

// Setup Restify Server
var server = restify.createServer();
server.post('api/messages', bot.verifyBotFramework(), bot.listen());

server.listen(process.env.PORT || 3978, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});



/*
// Create bot dialogs
bot.dialog('/', function (session) {
    session.send("Hello World");
});
*/