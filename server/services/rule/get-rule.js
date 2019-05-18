const HttpStatus = require('http-status');

const { Rule } = require('../../models');

const { BattleshipError } = require('../../utilities');

/**
 * Get rule with primary key from Database
 * @param {Number} id
 * @returns {Promise<Rule>}
 */
module.exports = async (id) => {
    const rule = await Rule.findByPk(id);

    if (!rule) {
        throw new BattleshipError('Rule not found', HttpStatus.NOT_FOUND);
    }

    return rule;
};
