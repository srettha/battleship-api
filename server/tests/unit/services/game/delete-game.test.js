const chai = require('chai');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Game } = require('../../../../models');

const gameService = require('../../../../services/game');

module.exports = () => {
    describe('deleteGame()', () => {
        let sandbox;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw game not found', async () => {
            sandbox.stub(Game, 'destroy')
                .resolves(0);

            try {
                await gameService.deleteGame(1);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Game not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should delete game', async () => {
            sandbox.stub(Game, 'destroy')
                .resolves(1);

            await gameService.deleteGame(1);
            assert.called(Game.destroy);
        });
    });
};
