const chai = require('chai');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Game, GameInformations } = require('../../../../models');

const modelFactory = require('../../../factory');

const gameService = require('../../../../services/game');

module.exports = () => {
    describe('getDraftGame()', () => {
        let sandbox;

        let game;
        let gameInformations;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [game] = modelFactory(Game, { id: 1, status: 'draft' });
            gameInformations = modelFactory(GameInformations, { gameId: game.id }, {}, 4);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return null', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(null);

            const actual = await gameService.getDraftGame();
            assert.equal(actual, null);
        });

        it('should return game with empty ships', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(game);
            sandbox.stub(GameInformations, 'findAll')
                .resolves([]);

            game.ships = [];

            const actual = await gameService.getDraftGame();
            assert.equal(game, actual);
        });

        it('should return game with ships', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(game);
            sandbox.stub(GameInformations, 'findAll')
                .resolves(GameInformations);

            game.ships = gameInformations;

            const actual = await gameService.getDraftGame();
            assert.equal(game, actual);
        });
    });
};
