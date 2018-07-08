/* eslint-disable no-param-reassign */

const functions = require('firebase-functions');
const {
  dialogflow,
  SimpleResponse,
} = require('actions-on-google');

const app = dialogflow({ debug: true });

const INTENTS = {
  defaultWelcomeIntent: 'Default Welcome Intent',
  defaultFallbackIntent: 'Default Fallback Intent',
};

// Default Welcome Intent
app.intent(INTENTS.defaultWelcomeIntent, (conv) => {
  const responseText = 'Alexa. Start bot battle.';

  conv.ask(new SimpleResponse({
    speech: responseText,
  }));
});


// Default Fallback Intent
app.intent(INTENTS.defaultFallbackIntent, (conv) => {
  const responseText = 'I cannot understand you. Please repeat.';
  conv.ask(new SimpleResponse({
    speech: responseText,
  }));
});

exports.botBattle = functions.https.onRequest(app);
