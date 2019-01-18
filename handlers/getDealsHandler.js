const Handler = require('../helpers/handler');
const ShapeResponse = require('../multimodal_responses/shapeResponse');

const DealsRequestHandler = Handler('YesIntent', handlerInput => ShapeResponse(handlerInput));


module.exports = DealsRequestHandler;