const LaunchDirective = require('../documents/launch');
const skill = require('../data/skill.json');

const AWS = require('aws-sdk');
const request = require('request');

module.exports = {
  canHandle: (handlerInput) => handlerInput.requestEnvelope.request.type === 'LaunchRequest',
  handle: (handlerInput) => {

      let apiAccessToken = event.context.System.apiAccessToken;
      let apiEndpoint = event.context.System.apiEndpoint;

      if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
      return handlerInput.responseBuilder
        .addDirective(LaunchDirective())
        .speak(skill.welcome +' Do you want to see a deal?.')
        .reprompt(skill.hint)
        .withShouldEndSession(false)
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak(skill.welcome + ' Do you want to see a deal?')
        .reprompt(skill.hint)
        .withShouldEndSession(false)
        .getResponse();
    }
  }
};
