const HttpStatus = require('http-status');
const _ = require('lodash');

const { Ship } = require('../../models');

const { BattleshipError } = require('../../utilities');

/**
 * Update ship with id and updateObject
 * @param {Object} queryObj
 * @param {Object} updateObj
 * @param {Object} [options]
 * @returns {Promise<Ship>}
 */
module.exports = async (queryObj, updateObj, options = {}) => {
    const sequelizeOptions = _.merge({ returning: true, where: queryObj }, options);

    const [count, [ship]] = await Ship.update(updateObj, sequelizeOptions);

    if (count === 0) {
        throw new BattleshipError('Ship not found', HttpStatus.NOT_FOUND);
    }

    return ship;
};
