/* eslint-disable no-param-reassign */

const functions = require('firebase-functions');
const {
  dialogflow,
  SimpleResponse,
} = require('actions-on-google');
const request = require('request-promise-native');

const app = dialogflow({ debug: true });
const AIUrl = 'https://h282dtqxfc.execute-api.us-east-1.amazonaws.com/dev/tictactoe';

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
  conv.data.board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

  conv.ask(new SimpleResponse({
    speech: responseText,
  }));
});

// Turn Intent
app.intent(INTENTS.turnIntent, (conv) => {
  const { 'number-integer': turnNumber, TurnLetter: turnLetter } = conv.parameters;
  const currentBoard = conv.data.board || ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

  let responseText;
  return request.post({
    method: 'POST',
    uri: AIUrl,
    body: { board: currentBoard, coordinate: `${turnLetter}${turnNumber}` },
    json: true,
  }).then((data) => {
    const {
      board, newTurnCoordinate, winStatus,
    } = data;
    conv.data.board = board;
    if (newTurnCoordinate === undefined) {
      responseText = 'It\'s a draw bro!';
    } else if (winStatus) {
      responseText = 'You lose.';
    } else {
      responseText = `My turn is ${newTurnCoordinate}`;
    }

    conv.ask(new SimpleResponse({
      speech: responseText,
    }));
  }).catch((err) => {
    console.error(err);

    conv.ask(new SimpleResponse({
      speech: 'Oops',
    }));
  });
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
  const responseText = 'I cannot understand you. Please repeat.';
  conv.ask(new SimpleResponse({
    speech: responseText,
  }));
});

exports.botBattle = functions.https.onRequest(app);
