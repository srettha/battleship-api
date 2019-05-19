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
    describe('createShip()', () => {
        let sandbox;

        let ship;

        const shipObj = { name: faker.name.findName(), life: faker.random.number(5) };

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [ship] = modelFactory(Ship, shipObj);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw error duplicated ship', async () => {
            sandbox.stub(Ship, 'findOrCreate')
                .resolves([ship, false]);

            try {
                await shipService.createShip(shipObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipValidationError');
                assert.equal(err.message, 'Duplicated Ship');
                assert.equal(err.statusCode, HttpStatus.BAD_REQUEST);
            }
        });

        it('should create new ship', async () => {
            sandbox.stub(Ship, 'findOrCreate')
                .resolves([ship, true]);

            const actual = await shipService.createShip(shipObj);
            assert.equal(actual, ship);
        });
    });
};
