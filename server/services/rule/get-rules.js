const { Rule } = require('../../models');

/**
 * Get rules from Database
 * @returns {Promise<Array<Rule>>}
 */
module.exports = async () => {
    const rules = await Rule.findAll();
    return rules;
};
