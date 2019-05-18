const HttpStatus = require('http-status');
const _ = require('lodash');

const { Game } = require('../../models');

const { BattleshipError } = require('../../utilities');

/**
 * Update game with id and updateObject
 * @param {Object} queryObj
 * @param {Object} updateObj
 * @param {Object} options
 * @returns {Promise<Game>}
 */
module.exports = async (queryObj, updateObj, options) => {
    const sequelizeOptions = _.merge({ returning: true, where: queryObj }, options);
    const [count, [game]] = await Game.update(updateObj, sequelizeOptions);

    if (count === 0) {
        throw new BattleshipError('Game not found', HttpStatus.NOT_FOUND);
    }

    return game;
};
