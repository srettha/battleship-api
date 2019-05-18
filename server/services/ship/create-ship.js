const HttpStatus = require('http-status');

const { Ship } = require('../../models');

const { BattleshipError } = require('../../utilities');

/**
 * Create new ship
 * @param {Object} queryObj
 * @returns {Promise<Ship>}
 */
module.exports = async (queryObj) => {
    const [ship, created] = await Ship.findOrCreate(queryObj, { default: queryObj });
    if (!created) {
        throw new BattleshipError('Duplicated Ship', HttpStatus.BAD_REQUEST);
    }

    return ship;
};
