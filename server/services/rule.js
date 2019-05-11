const DB = require('../models');

const { Rule } = DB;

/**
 * Create new rule
 * @param {Object} queryObj
 * @returns {Promise<Rule>}
 */
async function createRule(queryObj) {
    const [rule, created] = await Rule.findOrCreate(queryObj, { default: queryObj });
    if (!created) {
        throw new Error('Duplicated Rule');
    }

    return rule;
}

/**
 * Soft delete rule
 * @param {Number} id
 * @returns {Promise<void>}
 */
async function deleteRule(id) {
    const count = await Rule.destroy(id);
    if (count === 0) {
        throw new Error('Rule not found');
    }
}

/**
 * Get rule with primary key from Database
 * @param {Number} id
 * @returns {Promise<Rule>}
 */
async function getRule(id) {
    const rule = await Rule.findByPk(id);

    if (!rule) {
        throw new Error('Rule not found');
    }

    return rule;
}

/**
 * Get rules from Database
 * @returns {Promise<Array<Rule>>}
 */
async function getRules() {
    const rules = await Rule.findAll();
    return rules;
}

/**
 * Update rule with id and updateObject
 * @param {Number} id
 * @param {Object} updateObj
 */
async function updateRule(id, updateObj) {
    const [count, [rule]] = await Rule.update(updateObj, {
        returning: true,
        where: { id },
    });

    if (count === 0) {
        throw new Error('Rule not found');
    }

    return rule;
}

module.exports = {
    createRule,
    deleteRule,
    getRule,
    getRules,
    updateRule,
};
