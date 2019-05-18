const chai = require('chai');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { GameInformations } = require('../../../../models');

const modelFactory = require('../../../factory');

const gameInformationService = require('../../../../services/game-informations');

module.exports = () => {
    describe('getGameInformation()', () => {
        let sandbox;

        let gameInformation;

        const gameId = 1;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [gameInformation] = modelFactory(GameInformations, { gameId });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return game information', async () => {
            sandbox.stub(GameInformations, 'findOne')
                .resolves(gameInformation);

            const actual = await gameInformationService.getGameInformation({ gameId });
            assert.equal(actual, gameInformation);
        });
    });
};
