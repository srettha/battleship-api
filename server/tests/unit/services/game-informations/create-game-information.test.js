const chai = require('chai');
const faker = require('faker');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { GameInformations } = require('../../../../models');

const modelFactory = require('../../../factory');

const gameInformationService = require('../../../../services/game-informations');

module.exports = () => {
    describe('createGameInformation()', () => {
        let sandbox;

        let gameInformation;

        let gameInformationObj;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            gameInformationObj = {
                coordinateX: faker.random.number(10),
                coordinateY: faker.random.number(10),
                isHorizontal: faker.random.boolean(),
                gameId: faker.random.number(10),
                shipId: faker.random.number(10),
                baseHealth: faker.random.number(10),
                health: faker.random.number(10),
            };
            [gameInformation] = modelFactory(GameInformations, gameInformationObj);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw error duplicated game information', async () => {
            sandbox.stub(GameInformations, 'findOne')
                .resolves(gameInformation);

            try {
                await gameInformationService.createGameInformation(gameInformationObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Duplicated Game information');
                assert.equal(err.statusCode, HttpStatus.BAD_REQUEST);
            }
        });

        it('should create game information', async () => {
            sandbox.stub(GameInformations, 'findOne')
                .resolves(null);

            sandbox.stub(GameInformations, 'create')
                .resolves(gameInformation);

            const actual = await gameInformationService.createGameInformation(gameInformationObj);
            assert.equal(actual, gameInformation);
        });
    });
};
