const HttpStatus = require('http-status');
const { Op } = require('sequelize');

const { Game } = require('../../models');

const { BattleshipError } = require('../../utilities');

/**
 * Reset game status to abort
 * @returns {Promise<Game>}
 */
module.exports = async () => {
    const [count, [game]] = await Game.update({
        status: 'aborted',
    }, {
        returning: true,
        where: {
            status: {
                [Op.notIn]: ['aborted', 'finished'],
            },
        },
    });

    if (count === 0) {
        throw new BattleshipError('Game not found', HttpStatus.NOT_FOUND);
    }

    return game;
};
