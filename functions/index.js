const functions = require('firebase-functions');
const {
  dialogflow,
  SimpleResponse,
} = require('actions-on-google');

const app = dialogflow({ debug: true });

const INTENTS = {
  defaultWelcomeIntent: 'Default Welcome Intent',
  defaultFallbackIntent: 'Default Fallback Intent',
  startGameIntent: 'Start Game Intent',
  loseIntent: 'Lose Intent',
  turnIntent: 'Turn Intent',
};

// Default Welcome Intent
app.intent(INTENTS.defaultWelcomeIntent, (conv) => {
  const responseText = 'Hi, welcome to Bot Battle. You First.';
  conv.ask(new SimpleResponse({
    speech: responseText,
  }));
});

// Start Game Intent
app.intent(INTENTS.startGameIntent, (conv) => {
  const responseText = 'Alexa, tell bot battle to start a game.';
  conv.ask(new SimpleResponse({
    speech: responseText, 
  }));
});

// Turn Intent
app.intent(INTENTS.turnIntent, (conv) => {
  const responseText = 'My turn is b2';
  conv.ask(new SimpleResponse({
    speech: responseText, 
  }));
});

// Lose Intent
app.intent(INTENTS.loseIntent, (conv) => {
  const responseText = 'Ooo, no. I will beat you next time';
  conv.ask(new SimpleResponse({
    speech: responseText,
  }));
});

// Default Fallback Intent
app.intent(INTENTS.defaultFallbackIntent, (conv) => {
  const responseText = 'I cannot understand you.';
  conv.ask(new SimpleResponse({
    speech: responseText,
  }));
});

exports.botBattle = functions.https.onRequest(app);
