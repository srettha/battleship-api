const HttpStatus = require('http-status');

const { Rule } = require('../../models');

const { BattleshipError } = require('../../utilities');

/**
 * Create new rule
 * @param {Object} queryObj
 * @returns {Promise<Rule>}
 */
module.exports = async (queryObj) => {
    const [rule, created] = await Rule.findOrCreate(queryObj, { default: queryObj });
    if (!created) {
        throw new BattleshipError('Duplicated Rule', HttpStatus.BAD_REQUEST);
    }

    return rule;
};
