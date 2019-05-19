const HttpStatus = require('http-status');

const { Ship } = require('../../models');

const { BattleshipError } = require('../../errors');

/**
 * Get ship with its name from database
 * @param {String} name
 * @returns {Promise<Ship>}
 */
module.exports = async (name) => {
    const ship = await Ship.findOne({
        where: { name },
    });

    if (!ship) {
        throw new BattleshipError('Ship not found', HttpStatus.NOT_FOUND);
    }

    return ship;
};
