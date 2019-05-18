const HttpStatus = require('http-status');
const _ = require('lodash');

const { Rule } = require('../../models');

const { BattleshipError } = require('../../utilities');

/**
 * Update rule with id and updateObject
 * @param {Object} queryObj
 * @param {Object} updateObj
 * @param {Object} [options]
 * @returns {Promise<Rule>}
 */
module.exports = async (queryObj, updateObj, options = {}) => {
    const sequelizeOptions = _.merge({ returning: true, where: queryObj }, options);

    const [count, [rule]] = await Rule.update(updateObj, sequelizeOptions);

    if (count === 0) {
        throw new BattleshipError('Rule not found', HttpStatus.NOT_FOUND);
    }

    return rule;
};
