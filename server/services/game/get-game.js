const HttpStatus = require('http-status');

const { Game } = require('../../models');

const { BattleshipError } = require('../../utilities');

/**
 * Get game with primary key from Database
 * @param {Number} id
 * @returns {Promise<Game>}
 */
module.exports = async (id) => {
    const game = await Game.findByPk(id, {
        include: [{ all: true }],
    });

    if (!game) {
        throw new BattleshipError('Game not found', HttpStatus.NOT_FOUND);
    }

    return game;
};
