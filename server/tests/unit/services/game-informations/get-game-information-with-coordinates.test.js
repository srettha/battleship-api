const chai = require('chai');
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
        let gameInformations;

        const coordinate = { x: 5, y: 5 };
        const endCoordinate = { x: 10, y: 10 };

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            gameInformation = modelFactory(GameInformations, {
                coordinateX: coordinate.x,
                coordinateY: coordinate.y,
                gameId,
                shipId,
            });

            gameInformations = modelFactory(GameInformations, {
                coordinateX: coordinate.x,
                coordinateY: coordinate.y,
                endCoordinateX: endCoordinate.x,
                endCoordinateY: endCoordinate.y,
                gameId,
                shipId,
            }, {}, 4);
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
                assert.equal(err.name, 'BattleshipError');
                assert.equal(err.message, 'Game information not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should return game information (array === 1)', async () => {
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

        it('should return game information (array > 1)', async () => {
            sandbox.stub(GameInformations, 'findAll')
                .resolves(gameInformations);

            const actual = await gameInformationService.getGameInformationWithCoordinate(
                coordinate,
                {
                    gameId,
                    shipId,
                },
            );
            assert.isAtLeast(actual.coordinateX, coordinate.x);
            assert.isAtLeast(actual.coordinateY, coordinate.y);
            assert.isAtMost(actual.coordinateX, endCoordinate.x);
            assert.isAtMost(actual.coordinateY, endCoordinate.y);
        });
    });
};
