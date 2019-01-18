const Handler = require('../helpers/handler');
const skill = require('../data/skill.json');

const FallbackHandler = Handler('AMAZON.FallbackIntent', handlerInput =>
  handlerInput.responseBuilder
    .speak("I'm sorry, I didn't get that. Try again please.")
    .reprompt(skill.hint)
    .withShouldEndSession(false)
    .getResponse()
);

module.exports = FallbackHandler;
