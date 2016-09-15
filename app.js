// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: 'fdcdf197-2514-4131-8edb-61e5bfa8b7fb', appPassword: 'NN74S76qrmWbjmUeHKWQzWL' }); 
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


// Create bot dialogs
bot.dialog('/', function (session) {
    session.send("Hello World");
});