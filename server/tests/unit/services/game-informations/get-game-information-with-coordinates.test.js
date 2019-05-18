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
    describe('getGameInformationWithCoordinates()', () => {
        let sandbox;

        const gameId = 1;
        const shipId = 1;

        let gameInformation;

        const coordinate = { x: faker.random.number(10), y: faker.random.number(10) };

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            gameInformation = modelFactory(GameInformations, {
                coordinateX: coordinate.x,
                coordinateY: coordinate.y,
                gameId,
                shipId,
            });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw game information not found', async () => {
            sandbox.stub(GameInformations, 'findAll')
                .resolves([]);

            try {
                await gameInformationService.getGameInformationWithCoordinate(coordinate, { gameId, shipId });
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Game information not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should return game information', async () => {
            sandbox.stub(GameInformations, 'findAll')
                .resolves(gameInformation);

            const [actual] = await gameInformationService.getGameInformationWithCoordinate(
                coordinate,
                {
                    gameId,
                    shipId,
                },
            );
            assert.equal(actual, gameInformation);
        });
    });
};
