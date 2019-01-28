
const ShapeDirective = require('../documents/shape');
const shapeData = require('../data/shapes.json');
const skill = require('../data/skill.json');

module.exports = (handlerInput, speak = true) => {
  const attributes = handlerInput.attributesManager.getSessionAttributes();
  var lastSelection = attributes.lastSelection;
  if (undefined == lastSelection) {
    lastSelection = 0;
  }

  let shape = shapeData[lastSelection];
  lastSelection = lastSelection+1;

  if (lastSelection == shapeData.length) {
    lastSelection = 0;
  }

  attributes.lastItem = shape.name;
  attributes.landingURL = shape.landingURL;
  attributes.lastSelection = lastSelection;
  handlerInput.attributesManager.setSessionAttributes(attributes);
  
  let speech = 'You can buy ' + shape.name + ' at ' + shape.Price + '. ' + skill.buy;
  if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
    return handlerInput.responseBuilder
      .addDirective(ShapeDirective(shape))
      .speak(speak && (speech))
      .reprompt(skill.reprompt)
      .withShouldEndSession(false)
      .getResponse();
  } else {
    return handlerInput.responseBuilder
      .speak(speech)
      .reprompt(skill.reprompt)
      .withShouldEndSession(false)
      .getResponse();
  }
};
