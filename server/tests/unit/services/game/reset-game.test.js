const chai = require('chai');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Game } = require('../../../../models');
const modelFactory = require('../../../factory');

const gameService = require('../../../../services/game');

module.exports = () => {
    describe('resetGame()', () => {
        let sandbox;

        let game;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [game] = modelFactory(Game, { status: 'aborted' });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw game not found', async () => {
            sandbox.stub(Game, 'update')
                .resolves([0, []]);

            try {
                await gameService.resetGame();
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Game not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should reset game', async () => {
            sandbox.stub(Game, 'update')
                .resolves([1, [game]]);

            const actual = await gameService.resetGame();
            assert.equal(actual, game);
        });
    });
};
