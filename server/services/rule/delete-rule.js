const HttpStatus = require('http-status');

const { Rule } = require('../../models');

const { BattleshipError } = require('../../errors');

/**
 * Soft delete rule
 * @param {Number} id
 * @returns {Promise<void>}
 */
module.exports = async (id) => {
    const count = await Rule.destroy(id);
    if (count === 0) {
        throw new BattleshipError('Rule not found', HttpStatus.NOT_FOUND);
    }
};
