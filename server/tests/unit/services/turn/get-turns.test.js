const chai = require('chai');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Turn } = require('../../../../models');

const modelFactory = require('../../../factory');

const turnService = require('../../../../services/turn');

module.exports = () => {
    describe('getTurns()', () => {
        let sandbox;

        let turns;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            turns = modelFactory(Turn, { gameId: 1 });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return turn', async () => {
            sandbox.stub(Turn, 'findAll')
                .resolves(turns);

            const actual = await turnService.getTurns(1);
            assert.equal(actual, turns);
        });
    });
};
