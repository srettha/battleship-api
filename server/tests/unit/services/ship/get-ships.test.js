const chai = require('chai');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Ship } = require('../../../../models');

const modelFactory = require('../../../factory');

const shipService = require('../../../../services/ship');

module.exports = () => {
    describe('getShips()', () => {
        let sandbox;

        let ships;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            ships = modelFactory(Ship, {}, {}, 4);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return ships', async () => {
            sandbox.stub(Ship, 'findAll')
                .resolves(ships);

            const actual = await shipService.getShips();
            assert.deepEqual(actual, ships);
        });
    });
};
