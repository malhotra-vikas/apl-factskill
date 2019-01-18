const LaunchDirective = require('../documents/launch');
const skill = require('../data/skill.json');

const Alexa = require('ask-sdk-core');

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'BuyDealIntent';
    },
    handle(handlerInput) {
        var Sender = require('aws-sms-send');
        var config = {
            AWS: {
                accessKeyId: 'AKIAINWQIHILN3DNAG7A',
                secretAccessKey: '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',
                region: 'us-east-1',
            },
            topicArn: 'arn:aws:sns:us-east-1:846708839800:DealsSMS',
        };

        console.log("Using this to send message when you said buy");
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        console.log('Fetched from the session attributes PhoneNumber  ----- ' + attributes.PhoneNumber);

        var sender = new Sender(config);
        /* Send direct sms */
        sender.sendSms('Here is today\'s steal - : ' + attributes.landingURL , 'Today\'s Deal', false, '+1'+attributes.PhoneNumber)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (err) {
                console.log(err)
            });
        console.log('Text Sent');

        if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
            return handlerInput.responseBuilder
                .addDirective(LaunchDirective())
                .speak('Thanks for using the skill. You will recieve a text with the link for the deal shortly. Please come back again to see the next amazing deal')
                .withShouldEndSession(true)
                .getResponse();
        } else {
            return handlerInput.responseBuilder
                .speak('Thanks for using the skill. You will recieve a text with the link for the deal shortly. Please come back again to see the next amazing deal')
                .withShouldEndSession(true)
                .getResponse();
        }
    }
};

