const chai = require('chai');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Ship } = require('../../../../models');

const shipService = require('../../../../services/ship');

module.exports = () => {
    describe('deleteShip()', () => {
        let sandbox;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw ship not found', async () => {
            sandbox.stub(Ship, 'destroy')
                .resolves(0);

            try {
                await shipService.deleteShip(1);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Ship not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should delete ship', async () => {
            sandbox.stub(Ship, 'destroy')
                .resolves(1);

            await shipService.deleteShip(1);
            assert.called(Ship.destroy);
        });
    });
};
