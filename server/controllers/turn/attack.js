const HttpStatus = require('http-status');
const Joi = require('joi');

const turnService = require('../../services/turn');

const requestSchema = {
    body: {
        coordinate: Joi.object({
            x: Joi.number().min(1).required(),
            y: Joi.number().min(1).required(),
        }).required(),
    },
};

module.exports = async (req, res) => {
    const { coordinate } = req.body;
    const {
        hit,
        miss,
        name,
        status,
    } = await turnService.attack(coordinate);

    if (status === 'miss') {
        return res.status(HttpStatus.OK).json({
            message: `Shooting at coordinate x: ${coordinate.x}, coordinate y: ${coordinate.y} resulting in ${status}`,
        });
    }

    if (status === 'hit') {
        return res.status(HttpStatus.OK).json({
            message: `Shooting at coordinate x: ${coordinate.x}, coordinate y: ${coordinate.y} resulting in ${status}`,
        });
    }

    if (status === 'sank') {
        return res.status(HttpStatus.OK).json({
            message: `You just ${status} the ${name} at coordinate x: ${coordinate.x}, coordinate y: ${coordinate.y}`,
        });
    }

    if (status === 'end') {
        return res.status(HttpStatus.OK).json({
            message: 'Game over',
            data: { status: { hit, miss } },
        });
    }

    return res.status(HttpStatus.OK);
};
module.exports.requestSchema = requestSchema;
