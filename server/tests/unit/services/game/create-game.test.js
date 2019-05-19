const chai = require('chai');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Game, Rule } = require('../../../../models');

const modelFactory = require('../../../factory');

const gameService = require('../../../../services/game');

module.exports = () => {
    describe('createGame()', () => {
        let sandbox;

        let rule;
        let game;
        let gameObj;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [rule] = modelFactory(Rule);

            gameObj = {
                status: 'draft',
                ruleId: rule.id,
            };
            [game] = modelFactory(Game, gameObj);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw error duplicated game', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(game);

            try {
                await gameService.createGame(gameObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipValidationError')
                assert.equal(err.message, 'Duplicated Game');
                assert.equal(err.statusCode, HttpStatus.BAD_REQUEST);
            }
        });

        it('should create game', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(null);

            sandbox.stub(Game, 'create')
                .resolves(game);

            const actual = await gameService.createGame(gameObj);
            assert.equal(actual, game);
        });
    });
};
