const createRuleTest = require('./create-rule.test');
const deleteRuleTest = require('./delete-rule.test');
const getRuleWithCoordinateTest = require('./get-rule-with-coordinates.test');
const getRuleTest = require('./get-rule.test');
const getRulesTest = require('./get-rules.test');
const updateRuleTest = require('./update-rule.test');

describe('services/rule', () => {
    createRuleTest();
    deleteRuleTest();
    getRuleWithCoordinateTest();
    getRuleTest();
    getRulesTest();
    updateRuleTest();
});
