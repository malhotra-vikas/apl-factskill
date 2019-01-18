module.exports = {
  canHandle: (handlerInput)  =>
    handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'),
      handle: (handlerInput) => handlerInput.responseBuilder.speak("We hope you found a good deal. Deals are updated daily, please visit us again.").getResponse()
};
