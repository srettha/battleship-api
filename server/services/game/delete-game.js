const HttpStatus = require('http-status');

const { Game } = require('../../models');

const { BattleshipError } = require('../../errors');

/**
 * Soft delete game
 * @param {Number} id
 * @returns {Promise<void>}
 */
module.exports = async (id) => {
    const count = await Game.destroy(id);
    if (count === 0) {
        throw new BattleshipError('Game not found', HttpStatus.NOT_FOUND, { id });
    }
};
