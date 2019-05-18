const chai = require('chai');
const faker = require('faker');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Turn } = require('../../../../models');

const modelFactory = require('../../../factory');

const turnService = require('../../../../services/turn');

module.exports = () => {
    describe('getTurn()', () => {
        let sandbox;

        let turn;

        const queryObj = {
            coordinateX: faker.random.number(10),
            coordinateY: faker.random.number(10),
            gameId: faker.random.number(10),
        };

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [turn] = modelFactory(Turn, queryObj);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return null', async () => {
            sandbox.stub(Turn, 'findOne')
                .resolves(null);

            const actual = await turnService.getTurn(queryObj);
            assert.equal(actual, null);
        });

        it('should return turn', async () => {
            sandbox.stub(Turn, 'findOne')
                .resolves(turn);

            const actual = await turnService.getTurn(queryObj);
            assert.equal(actual, turn);
        });
    });
};
