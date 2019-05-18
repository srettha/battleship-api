const chai = require('chai');
const faker = require('faker');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Rule } = require('../../../../models');

const modelFactory = require('../../../factory');

const ruleService = require('../../../../services/rule');

module.exports = () => {
    describe('getRuleWithCoordinates()', () => {
        let sandbox;

        let rule;

        const queryObj = { coordinateX: faker.random.number(10), coordinateY: faker.random.number(10) };

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [rule] = modelFactory(Rule, queryObj);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw rule not found', async () => {
            sandbox.stub(Rule, 'findOne')
                .resolves(null);

            try {
                await ruleService.getRuleWithCoordinates(queryObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Rule not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should return rule', async () => {
            sandbox.stub(Rule, 'findOne')
                .resolves(rule);

            const actual = await ruleService.getRuleWithCoordinates(queryObj);
            assert.equal(actual, rule);
        });
    });
};
