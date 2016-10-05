
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

// Variaveis do LUIS
var model = 'https://api.projectoxford.ai/luis/v1/application?id=97a354c7-a3b5-4bfd-af0e-23cdeeca07e9&subscription-key=a6e93ac78b9d4a86a02561ba42940a48';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);

dialog.matches('builtin.intent.AgendamentoExame.Agendar', builder.DialogAction.send('Chamou Agendar1'));
dialog.matches('builtin.intent.Agendar', builder.DialogAction.send('Chamou Agendar2'));
dialog.onDefault(builder.DialogAction.send("Desculpe, nao entendi..."));

// Create bot dialogs
//bot.dialog('/', function (session) {
//    session.send("Hello World");
//});


bot.dialog('/old', [
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