const chai = require('chai');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Rule } = require('../../../../models');

const ruleService = require('../../../../services/rule');

module.exports = () => {
    describe('deleteRule()', () => {
        let sandbox;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw rule not found', async () => {
            sandbox.stub(Rule, 'destroy')
                .resolves(0);

            try {
                await ruleService.deleteRule(1);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipError');
                assert.equal(err.message, 'Rule not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should delete rule', async () => {
            sandbox.stub(Rule, 'destroy')
                .resolves(1);

            await ruleService.deleteRule(1);
            assert.called(Rule.destroy);
        });
    });
};
