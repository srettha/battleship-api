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
    describe('createRule()', () => {
        let sandbox;

        let ships;

        let rule;

        let ruleObj;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            ships = modelFactory(Ship, {}, {}, 4);

            ruleObj = { coordinateX: faker.random.number(10), coordinateY: faker.random.number(10), ships };
            [rule] = modelFactory(Rule, ruleObj);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw error duplicated rule', async () => {
            sandbox.stub(Rule, 'findOrCreate')
                .resolves([rule, false]);

            try {
                await ruleService.createRule(ruleObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Duplicated Rule');
                assert.equal(err.statusCode, HttpStatus.BAD_REQUEST);
            }
        });

        it('should create new rule', async () => {
            sandbox.stub(Rule, 'findOrCreate')
                .resolves([rule, true]);

            const actual = await ruleService.createRule(ruleObj);
            assert.equal(actual, rule);
        });
    });
};
