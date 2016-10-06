
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

dialog.matches('Saudacao', builder.DialogAction.send('Entendi que voce quer dizer ola'));
dialog.matches('Remarcar', builder.DialogAction.send('Entendi que voce quer Remarcar'));
dialog.matches('Cancelar', builder.DialogAction.send('Entendi que voce quer Remarcar'));
dialog.matches('Reclamar', builder.DialogAction.send('Entendi que voce quer Remarcar'));
dialog.matches('Agendar', builder.DialogAction.send('Entendi que voce quer Agendar'));

//dialog.onDefault(builder.DialogAction.send("Desculpe, nao entendi..."));

dialog.onDefault([
    function (session, args, next) {
		session.send("qualquer coisa");
		var title = builder.EntityRecognizer.findEntity(args.entities, 'builtin.AgendamentoExame.Entidade');
		var outracoisa = builder.EntityRecognizer.findEntity(args.entities, 'builtin.Entidade');
		var aindaoutro = builder.EntityRecognizer.findEntity(args.entities, 'Entidade');
		
		session.send('tile %s !', title);
		session.send('tile %s !', outracoisa);
		session.send('tile %s !', aindaoutro);
    }
]);


dialog.matches('Saudacao', [
    function (session, args, next) {
		//session.beginDialog('/askName');
		session.beginDialog('/ensureProfile', session.userData.profile);
    },
    function (session, results) {
        session.send('Ola %s!', session.userData.profile.name);
        session.send('Como posso te ajudar?');
    }
]);



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

bot.dialog('/ensureProfile', [
    function (session, args, next) {
        session.dialogData.profile = args || {};
        if (!args.profile.name) {
            builder.Prompts.text(session, "Ola! Qual o seu nome?");
        } else {
            next();
        }
    },
    function (session, results, next) {
        if (results.response) {
            session.dialogData.profile.name = results.response;
        }
        session.endDialogWithResults({ response: session.dialogData.profile })
    }
]);