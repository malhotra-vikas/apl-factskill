const Alexa = require('ask-sdk-core');
const LaunchRequestHandler = require('./handlers/launchRequestHandler');
const HelpRequestHandler = require('./handlers/helpRequestHandler');
const EventHandler = require('./handlers/eventHandler');
const CancelIntentHandler = require('./handlers/cancelIntentHandler');
const YesDealsRequestHandler = require('./handlers/getYesDealsHandler');
const DealsRequestHandler = require('./handlers/getDealsHandler');
const FallbackHandler = require('./handlers/fallbackHandler');
const BuyDealsRequestHandler = require('./handlers/buyDealsHandler');
const ShapeRequestHandler = require('./handlers/getShapeHandler');

const SessionEndedRequestHandler = {
  canHandle: (handlerInput) => handlerInput.requestEnvelope.request.type === 'SessionEndedRequest',
  handle: (handlerInput) => handlerInput.responseBuilder.speak("I hope you found your deal. Please come back again tomorrow.").getResponse()
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpRequestHandler,
    EventHandler,
    CancelIntentHandler,
    DealsRequestHandler,
    YesDealsRequestHandler,
    BuyDealsRequestHandler,
    FallbackHandler,
    ShapeRequestHandler,
    SessionEndedRequestHandler
  )
  .lambda();
