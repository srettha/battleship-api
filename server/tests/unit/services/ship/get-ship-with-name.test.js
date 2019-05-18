const chai = require('chai');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Ship } = require('../../../../models');

const modelFactory = require('../../../factory');

const shipService = require('../../../../services/ship');

module.exports = () => {
    describe('getShipByName()', () => {
        let sandbox;

        let ship;

        const name = 'battleship';

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [ship] = modelFactory(Ship, { name });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw ship not found', async () => {
            sandbox.stub(Ship, 'findOne')
                .resolves(null);

            try {
                await shipService.getShipWithName(name);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Ship not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should return ship', async () => {
            sandbox.stub(Ship, 'findOne')
                .resolves(ship);

            const actual = await shipService.getShipWithName(name);
            assert.equal(actual, ship);
        });
    });
};
