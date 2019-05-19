const chai = require('chai');
const faker = require('faker');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Ship } = require('../../../../models');

const modelFactory = require('../../../factory');

const shipService = require('../../../../services/ship');

module.exports = () => {
    describe('updateShip()', () => {
        let sandbox;

        let ship;

        const id = 1;
        const shipObj = { id, name: faker.name.findName(), life: faker.random.number(5) };

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [ship] = modelFactory(Ship, shipObj);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw ship not found', async () => {
            sandbox.stub(Ship, 'update')
                .resolves([0, []]);

            try {
                await shipService.updateShip({ id }, shipObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipError');
                assert.equal(err.message, 'Ship not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should update ship', async () => {
            sandbox.stub(Ship, 'update')
                .resolves([1, [ship]]);

            const actual = await shipService.updateShip({ id }, shipObj);
            assert.equal(actual, ship);
        });
    });
};
