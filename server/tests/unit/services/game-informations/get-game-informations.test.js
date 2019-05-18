const chai = require('chai');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { GameInformations } = require('../../../../models');

const modelFactory = require('../../../factory');

const gameInformationService = require('../../../../services/game-informations');

module.exports = () => {
    describe('getGameInformations()', () => {
        let sandbox;

        let gameInformations;

        const gameId = 1;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            gameInformations = modelFactory(GameInformations, { gameId }, {}, 4);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return game informations', async () => {
            sandbox.stub(GameInformations, 'findAll')
                .resolves(gameInformations);

            const actual = await gameInformationService.getGameInformations(gameId);
            assert.deepEqual(actual, gameInformations);
        });
    });
};
