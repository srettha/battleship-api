const { Rule } = require('../../models');

const { BattleshipValidationError } = require('../../errors');

/**
 * Create new rule
 * @param {Object} queryObj
 * @returns {Promise<Rule>}
 */
module.exports = async (queryObj) => {
    const [rule, created] = await Rule.findOrCreate(queryObj, { default: queryObj });
    if (!created) {
        throw new BattleshipValidationError('Duplicated Rule', queryObj);
    }

    return rule;
};
