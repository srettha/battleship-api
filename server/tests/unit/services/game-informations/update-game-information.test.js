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
    describe('updateGameInformation()', () => {
        let sandbox;

        let gameInformation;

        const gameId = 1;
        const shipId = 1;
        const gameInformationObj = {
            coordinateX: faker.random.number(10),
            coordinateY: faker.random.number(10),
            gameId,
            shipId,
        };

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [gameInformation] = modelFactory(GameInformations, { gameId });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw game information not found', async () => {
            sandbox.stub(GameInformations, 'update')
                .resolves([0, []]);

            try {
                await gameInformationService.updateGameInformation({ gameId, shipId }, gameInformationObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Game information not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should return game information', async () => {
            sandbox.stub(GameInformations, 'update')
                .resolves([1, [gameInformation]]);

            const actual = await gameInformationService.updateGameInformation({ gameId, shipId }, gameInformationObj);
            assert.equal(actual, gameInformation);
        });
    });
};
