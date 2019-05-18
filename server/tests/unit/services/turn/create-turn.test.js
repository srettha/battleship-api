const chai = require('chai');
const faker = require('faker');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Turn } = require('../../../../models');

const modelFactory = require('../../../factory');

const turnService = require('../../../../services/turn');

module.exports = () => {
    describe('createTurn()', () => {
        let sandbox;

        let turn;

        const turnObj = {
            coordinateX: faker.random.number(10),
            coordinateY: faker.random.number(10),
            status: faker.random.arrayElement(['hit', 'miss']),
            gameId: faker.random.number(10),
        };

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [turn] = modelFactory(Turn, turnObj);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw an error', async () => {
            sandbox.stub(Turn, 'findOne')
                .resolves(turn);

            try {
                await turnService.createTurn();
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Player needs to place all ships before start attacking');
                assert.equal(err.statusCode, HttpStatus.UNAUTHORIZED);
            }
        });

        it('should create new turn', async () => {
            sandbox.stub(Turn, 'findOne')
                .resolves(null);
            sandbox.stub(Turn, 'create')
                .resolves(turn);

            const actual = await turnService.createTurn(turnObj);
            assert.equal(actual, turn);
        });
    });
};
