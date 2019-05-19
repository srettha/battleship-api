const HttpStatus = require('http-status');

const { Rule, Ship } = require('../../models');

const { BattleshipError } = require('../../errors');

/**
 * Get rule with its coordinate from database
 * @param {Object} queryObj
 * @param {Number} [queryObj.coordinateX]
 * @param {Number} [queryObj.coordinateY]
 */
module.exports = async (queryObj) => {
    const rule = await Rule.findOne({
        attributes: ['id', 'coordinateX', 'coordinateY'],
        include: [
            {
                as: 'ships',
                model: Ship,
                required: false,
                through: { attributes: ['number'] },
            },
        ],
        where: queryObj,
    });

    if (!rule) {
        throw new BattleshipError('Rule not found', HttpStatus.NOT_FOUND);
    }

    return rule;
};
