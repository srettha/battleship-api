const chai = require('chai');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Rule } = require('../../../../models');

const modelFactory = require('../../../factory');

const ruleService = require('../../../../services/rule');

module.exports = () => {
    describe('getRules()', () => {
        let sandbox;

        let rules;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            rules = modelFactory(Rule, {}, {}, 4);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return rules', async () => {
            sandbox.stub(Rule, 'findAll')
                .resolves(rules);

            const actual = await ruleService.getRules();
            assert.deepEqual(actual, rules);
        });
    });
};
