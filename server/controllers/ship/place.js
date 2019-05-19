const HttpStatus = require('http-status');
const Joi = require('joi');

const gameService = require('../../services/game');

const requestSchema = {
    body: {
        name: Joi.string().required(),
        coordinate: Joi.object({
            x: Joi.number().required(),
            y: Joi.number().required(),
        }).required(),
        direciton: Joi.string().valid('horizontal', 'vertical').required(),
        ruleCoordinate: Joi.object({
            coordinateX: Joi.number().required(),
            coordinateY: Joi.number().required(),
        }).optional(),
    },
};

module.exports = async (req, res) => {
    await gameService.startGame(req.body);
    res.status(HttpStatus.CREATED).json({
        message: `placed ${req.body.name} at x:${req.body.coordinate.x} y:${req.body.coordinate.y}`,
    });
};
module.exports.requestSchema = requestSchema;
