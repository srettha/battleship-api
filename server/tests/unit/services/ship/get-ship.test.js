const chai = require('chai');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Ship } = require('../../../../models');

const modelFactory = require('../../../factory');

const shipService = require('../../../../services/ship');

module.exports = () => {
    describe('getShip()', () => {
        let sandbox;

        let ship;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [ship] = modelFactory(Ship, { id: 1 });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw ship not found', async () => {
            sandbox.stub(Ship, 'findByPk')
                .resolves(null);

            try {
                await shipService.getShip(1);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipError');
                assert.equal(err.message, 'Ship not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should return ship', async () => {
            sandbox.stub(Ship, 'findByPk')
                .resolves(ship);

            const actual = await shipService.getShip(1);
            assert.equal(actual, ship);
        });
    });
};
