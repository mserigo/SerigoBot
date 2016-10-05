
//({ appId: 'fdcdf197-2514-4131-8edb-61e5bfa8b7fb', appPassword: 'NN74S76qrmWbjmUeHKWQzWL' }); 

// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

var appId = process.env.MY_APP_ID || "Missing your app ID";
var appSecret = process.env.MY_APP_SECRET || "Missing your app secret";

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: process.env.MY_APP_ID, appPassword: process.env.MY_APP_SECRET }); 
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
//bot.dialog('/', function (session) {
//    session.send("Hello World");
//});


bot.dialog('/', [
    function (session) {
        session.beginDialog('/askName');
    },
    function (session, results) {
        session.send('Ola %s!', results.response);
        session.send('Tudo bem com voce?');
        session.send('Como posso te ajudar?');
    }
]);
bot.dialog('/askName', [
    function (session) {
        builder.Prompts.text(session, 'Ola! Como voce gosta de ser chamado?');
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);