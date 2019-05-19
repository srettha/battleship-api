const { Ship } = require('../../models');

const { BattleshipValidationError } = require('../../errors');

/**
 * Create new ship
 * @param {Object} queryObj
 * @returns {Promise<Ship>}
 */
module.exports = async (queryObj) => {
    const [ship, created] = await Ship.findOrCreate(queryObj, { default: queryObj });
    if (!created) {
        throw new BattleshipValidationError('Duplicated Ship', queryObj);
    }

    return ship;
};
