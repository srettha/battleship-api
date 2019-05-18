const chai = require('chai');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Turn } = require('../../../../models');

const turnService = require('../../../../services/turn');

module.exports = () => {
    describe('countTurns()', () => {
        let sandbox;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return count turns', async () => {
            sandbox.stub(Turn, 'count')
                .onFirstCall()
                .resolves(10)
                .onSecondCall(10)
                .resolves(10);

            const actual = await turnService.countTurns(1);
            assert.deepEqual(actual, { hit: 10, miss: 10 });
        });
    });
};
