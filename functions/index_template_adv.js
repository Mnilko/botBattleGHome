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
  startGameIntent: 'Start Game Intent',
  repeatIntent: 'Repeat Intent',
  drawIntent: 'Draw Intent',
  loseIntent: 'Lose Intent',
  turnIntent: 'Turn Intent',
};

// Default Welcome Intent
app.intent(INTENTS.defaultWelcomeIntent, (conv) => {
  const responseText = 'Alexa. Start bot battle.';

  conv.ask(new SimpleResponse({
    speech: responseText,
  }));
});

// Start Game Intent
app.intent(INTENTS.startGameIntent, (conv) => {
  const responseText = 'Alexa.  tell bot battle to start a game.';
  conv.data.board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

  conv.ask(new SimpleResponse({
    speech: responseText,
  }));
});

// Turn Intent
app.intent(INTENTS.turnIntent, (conv) => {
  const { TurnNumber: turnNumber = '', TurnLetter: turnLetter = '' } = conv.parameters;
  const currentBoard = conv.data.board || ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

  let responseText;
  responseText = currentBoard;
  conv.ask(new SimpleResponse({
    speech: responseText,
  }));

});

// Repeat Intent
app.intent(INTENTS.repeatIntent, (conv) => {
  const responseText = conv.data.lastResponse || 'What?';
  conv.ask(new SimpleResponse({
    speech: responseText,
  }));
});


// Draw Intent
app.intent(INTENTS.drawIntent, (conv) => {
  const responseText = 'Good game. Thanks!';
  conv.close(new SimpleResponse({
    speech: responseText,
  }));
});

// Lose Intent
app.intent(INTENTS.loseIntent, (conv) => {
  const responseText = 'Ooo, no. I will beat you next time';
  conv.close(new SimpleResponse({
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
