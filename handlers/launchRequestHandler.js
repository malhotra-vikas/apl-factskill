const LaunchDirective = require('../documents/launch');
const skill = require('../data/skill.json');

const Alexa = require('ask-sdk-core');

module.exports = {
  canHandle: (handlerInput) => handlerInput.requestEnvelope.request.type === 'LaunchRequest',
  async handle(handlerInput) {

      const messages = {
          WELCOME: 'Welcome to the Sample Alexa Customer Profile API Skill! You can ask for your name, your email address, or your phone number. What do you want to ask?',
          WHAT_DO_YOU_WANT: 'What do you want to ask?',
          NOTIFY_MISSING_PERMISSIONS: 'I need to know your phone number in order to text you the deals. Please enable permissions in the Amazon Alexa app.',
          NAME_MISSING: 'You can set your name either in the Alexa app under calling and messaging, or you can set it at Amazon.com, under log-in and security.',
          EMAIL_MISSING: 'You can set your email at Amazon.com, under log-in and security.',
          NUMBER_MISSING: 'You can set your phone number at Amazon.com, under log-in and security.',
          NAME_AVAILABLE: 'Here is your full name: ',
          EMAIL_AVAILABLE: 'Here is your email address: ',
          NUMBER_AVAILABLE: 'Here is your phone number: ',
          ERROR: 'Uh Oh. Looks like something went wrong.',
          API_FAILURE: 'There was an error with the Alexa Customer Profile API. Please try again.',
          GOODBYE: 'Bye! Thanks for using the Sample Alexa Customer Profile API Skill!',
          UNHANDLED: 'This skill doesn\'t support that. Please ask something else.',
          HELP: 'You can use this skill by asking something like: whats my name?',
          STOP: 'Bye! Thanks for using the Sample Alexa Customer Profile API Skill!',
      };

      const PERMISSIONS = ['alexa::profile:mobile_number:read'];

      let apiAccessToken = handlerInput.requestEnvelope.context.System.apiAccessToken
      let apiEndpoint = handlerInput.requestEnvelope.context.System.apiEndpoint;
      let serviceClientFactory = handlerInput.serviceClientFactory;

      const consentToken = handlerInput.requestEnvelope.context.System.apiAccessToken;

      if (!consentToken) {
          return handlerInput.responseBuilder
              .speak(messages.NOTIFY_MISSING_PERMISSIONS)
              .withAskForPermissionsConsentCard(PERMISSIONS)
              .getResponse();
      }
      try {
          const client = serviceClientFactory.getUpsServiceClient();
          const number = await client.getProfileMobileNumber();

          console.log('Number successfully retrieved, now responding to user.');

          if (number == null) {
              return handlerInput.responseBuilder
                  .speak(messages.NUMBER_MISSING)
                  .withShouldEndSession(true)
                  .getResponse();
          } else {
              const phoneNumber = number.phoneNumber;

              const attributes = handlerInput.attributesManager.getSessionAttributes();
              console.log('attributes   ----- ' + attributes);

              attributes.PhoneNumber = phoneNumber;
              console.log('attributes Phonenumber  ----- ' + phoneNumber);

              handlerInput.attributesManager.setSessionAttributes(attributes);
              console.log('attributes set ');

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
      } catch (error) {
          if (error.name == 'ServiceError') {
              return handlerInput.responseBuilder
                  .speak(messages.NOTIFY_MISSING_PERMISSIONS)
                  .withAskForPermissionsConsentCard(PERMISSIONS)
                  .getResponse();
          }
          if (error.name !== 'ServiceError') {
              return handlerInput.responseBuilder
                  .speak(messages.ERROR)
                  .withShouldEndSession(true)
                  .getResponse();
          }
          throw error;
      }
  }
};
