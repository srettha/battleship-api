const chai = require('chai');
const faker = require('faker');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const DB = require('../../../models');
const modelFactory = require('../../factory');
const ruleService = require('../../../services/rule');

const { Rule } = DB;

describe('service/rule', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createRule()', () => {
        let rule;

        const ruleObj = { coordinateX: faker.random.number(10), coordinateY: faker.random.number(10) };

        beforeEach(() => {
            rule = modelFactory(Rule, ruleObj);
        });

        it('should throw error duplicated rule', async () => {
            sandbox.stub(Rule, 'findOrCreate')
                .resolves([rule, false]);

            try {
                await ruleService.createRule(ruleObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Duplicated Rule');
            }
        });

        it('should create new rule', async () => {
            sandbox.stub(Rule, 'findOrCreate')
                .resolves([rule, true]);

            const actual = await ruleService.createRule(ruleObj);
            assert.equal(actual, rule);
        });
    });

    describe('deleteRule()', () => {
        it('should throw rule not found', async () => {
            sandbox.stub(Rule, 'destroy')
                .resolves(0);

            try {
                await ruleService.deleteRule(1);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Rule not found');
            }
        });

        it('should delete rule', async () => {
            sandbox.stub(Rule, 'destroy')
                .resolves(1);

            await ruleService.deleteRule(1);
            assert.called(Rule.destroy);
        });
    });

    describe('getRule()', () => {
        let rule;

        beforeEach(() => {
            rule = modelFactory(Rule, { id: 1 });
        });

        it('should throw rule not found', async () => {
            sandbox.stub(Rule, 'findByPk')
                .resolves(undefined);

            try {
                await ruleService.getRule(1);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Rule not found');
            }
        });

        it('should return rule', async () => {
            sandbox.stub(Rule, 'findByPk')
                .resolves(rule);

            const actual = await ruleService.getRule(1);
            assert.equal(actual, rule);
        });
    });

    describe('getRules()', () => {
        let rules;

        beforeEach(() => {
            rules = modelFactory(Rule, {}, {}, 4);
        });

        it('should return rules', async () => {
            sandbox.stub(Rule, 'findAll')
                .resolves(rules);

            const actual = await ruleService.getRules();
            assert.deepEqual(actual, rules);
        });
    });

    describe('updateRule()', () => {
        let rule;

        const id = 1;
        const ruleObj = { id, coordinateX: faker.random.arrayElement([10, 15, 20, 25, 30]), coordinateY: faker.random.arrayElement([10, 15, 20, 25, 30]) };

        beforeEach(() => {
            [rule] = modelFactory(Rule, ruleObj);
        });

        it('should throw rule not found', async () => {
            sandbox.stub(Rule, 'update')
                .resolves([0, []]);

            try {
                await ruleService.updateRule(id, ruleObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Rule not found');
            }
        });

        it('should update rule', async () => {
            sandbox.stub(Rule, 'update')
                .resolves([1, [rule]]);

            const actual = await ruleService.updateRule(id, ruleObj);
            assert.equal(actual, rule);
        });
    });
});
