const chai = require('chai');
const faker = require('faker');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Rule, Ship } = require('../../../../models');

const modelFactory = require('../../../factory');

const ruleService = require('../../../../services/rule');

module.exports = () => {
    describe('updateRule()', () => {
        let sandbox;

        let ships;

        let rule;
        let ruleObj;

        const id = 1;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            ships = modelFactory(Ship, {}, {}, 4);

            ruleObj = {
                id,
                coordinateX: faker.random.arrayElement([10, 15, 20, 25, 30]),
                coordinateY: faker.random.arrayElement([10, 15, 20, 25, 30]),
                ships,
            };
            [rule] = modelFactory(Rule, ruleObj);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw rule not found', async () => {
            sandbox.stub(Rule, 'update')
                .resolves([0, []]);

            try {
                await ruleService.updateRule({ id }, ruleObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipError');
                assert.equal(err.message, 'Rule not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should update rule', async () => {
            sandbox.stub(Rule, 'update')
                .resolves([1, [rule]]);

            const actual = await ruleService.updateRule({ id }, ruleObj);
            assert.equal(actual, rule);
        });
    });
};
