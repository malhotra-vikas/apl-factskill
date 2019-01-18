const Handler = require('../helpers/handler');
const ShapeResponse = require('../multimodal_responses/shapeResponse');

const BuyDealsRequestHandler = Handler('BuyDealIntent', handlerInput => ShapeResponse(handlerInput));

var Sender = require('aws-sms-send');
var config = {
    AWS: {
        accessKeyId: 'AKIAJROCIMDOBTTDEKNA',
        secretAccessKey: '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',
        region: 'us-east-1',
    },
    topicArn: 'arn:aws:sns:us-east-1:846708839800:DealsSMS',
};

var sender = new Sender(config);
/* Send direct sms */
sender.sendSms('Deals landing link in the body', 'Todays Deal', false, '+14133184527')
 .then(function(response) {
   console.log(response);
 })
 .catch(function(err) {
    console.log(err)
 });

module.exports = BuyDealsRequestHandler;