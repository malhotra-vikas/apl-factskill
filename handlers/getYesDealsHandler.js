const Handler = require('../helpers/handler');
const ShapeResponse = require('../multimodal_responses/shapeResponse');

const YesDealsRequestHandler = Handler('GetDealsIntent', handlerInput => ShapeResponse(handlerInput));


module.exports = YesDealsRequestHandler;