const chai = require('chai');
const faker = require('faker');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const DB = require('../../../models');
const modelFactory = require('../../factory');
const shipService = require('../../../services/ship');

const { Ship } = DB;

describe('services/ship', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createShip', () => {
        let ship;

        const shipObj = { name: faker.name.findName(), life: faker.random.number(5) };

        beforeEach(() => {
            [ship] = modelFactory(Ship, shipObj);
        });

        it('should throw error duplicated ship', async () => {
            sandbox.stub(Ship, 'findOrCreate')
                .resolves([ship, false]);

            try {
                await shipService.createShip(shipObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Duplicated Ship');
            }
        });

        it('should create new ship', async () => {
            sandbox.stub(Ship, 'findOrCreate')
                .resolves([ship, true]);

            const actual = await shipService.createShip(shipObj);
            assert.equal(actual, ship);
        });
    });

    describe('deleteShip', () => {
        it('should throw ship not found', async () => {
            sandbox.stub(Ship, 'destroy')
                .resolves(0);

            try {
                await shipService.deleteShip(1);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Ship not found');
            }
        });

        it('should delete ship', async () => {
            sandbox.stub(Ship, 'destroy')
                .resolves(1);

            await shipService.deleteShip(1);
            assert.called(Ship.destroy);
        });
    });

    describe('getShip()', () => {
        let ship;

        beforeEach(() => {
            [ship] = modelFactory(Ship, { id: 1 });
        });

        it('should throw ship not found', async () => {
            sandbox.stub(Ship, 'findByPk')
                .resolves(undefined);

            try {
                await shipService.getShip(1);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Ship not found');
            }
        });

        it('should return ship', async () => {
            sandbox.stub(Ship, 'findByPk')
                .resolves(ship);

            const actual = await shipService.getShip(1);
            assert.equal(actual, ship);
        });
    });

    describe('getShips()', () => {
        let ships;

        beforeEach(() => {
            ships = modelFactory(Ship, {}, {}, 4);
        });

        it('should return ships', async () => {
            sandbox.stub(Ship, 'findAll')
                .resolves(ships);

            const actual = await shipService.getShips();
            assert.deepEqual(actual, ships);
        });
    });

    describe('updateShip()', () => {
        let ship;

        const id = 1;
        const shipObj = { id, name: faker.name.findName(), life: faker.random.number(5) };

        beforeEach(() => {
            [ship] = modelFactory(Ship, shipObj);
        });

        it('should throw ship not found', async () => {
            sandbox.stub(Ship, 'update')
                .resolves([0, []]);

            try {
                await shipService.updateShip(id, shipObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Ship not found');
            }
        });

        it('should update ship', async () => {
            sandbox.stub(Ship, 'update')
                .resolves([1, [ship]]);

            const actual = await shipService.updateShip(id, shipObj);
            assert.equal(actual, ship);
        });
    });
});
