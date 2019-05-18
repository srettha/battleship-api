const HttpStatus = require('http-status');
const _ = require('lodash');

const { GameInformations } = require('../../models');

const { BattleshipError } = require('../../utilities');

/**
 * Update game information
 * @param {Object} queryObj
 * @param {Object} updateObj
 * @param {Object} [options]
 * @returns {Promise<GameInformations>}
 */
module.exports = async (queryObj, updateObj, options = {}) => {
    const sequelizeOptions = _.merge({ returning: true, where: queryObj }, options);
    const [count, [gameInformation]] = await GameInformations.update(updateObj, sequelizeOptions);

    if (count === 0) {
        throw new BattleshipError('Game information not found', HttpStatus.NOT_FOUND);
    }

    return gameInformation;
};
