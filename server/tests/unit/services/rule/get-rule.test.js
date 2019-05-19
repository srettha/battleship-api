const chai = require('chai');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Rule } = require('../../../../models');

const modelFactory = require('../../../factory');

const ruleService = require('../../../../services/rule');

module.exports = () => {
    describe('getRule()', () => {
        let sandbox;

        let rule;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [rule] = modelFactory(Rule, { id: 1 });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw rule not found', async () => {
            sandbox.stub(Rule, 'findByPk')
                .resolves(null);

            try {
                await ruleService.getRule(1);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipError');
                assert.equal(err.message, 'Rule not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should return rule', async () => {
            sandbox.stub(Rule, 'findByPk')
                .resolves(rule);

            const actual = await ruleService.getRule(1);
            assert.equal(actual, rule);
        });
    });
};
