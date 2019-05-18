const HttpStatus = require('http-status');

const { Ship } = require('../../models');

const { BattleshipError } = require('../../utilities');

/**
 * Get ship with primary key from database
 * @param {Number} id
 * @returns {Promise<Ship>}
 */
module.exports = async (id) => {
    const ship = await Ship.findByPk(id);

    if (!ship) {
        throw new BattleshipError('Ship not found', HttpStatus.NOT_FOUND);
    }

    return ship;
};
