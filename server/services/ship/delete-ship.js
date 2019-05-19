const HttpStatus = require('http-status');

const { Ship } = require('../../models');

const { BattleshipError } = require('../../errors');

/**
 * Soft delete ship
 * @param {Number} id
 * @returns {Promise<void>}
 */
module.exports = async (id) => {
    const count = await Ship.destroy(id);
    if (count === 0) {
        throw new BattleshipError('Ship not found', HttpStatus.NOT_FOUND);
    }
};
