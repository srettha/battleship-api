const chai = require('chai');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const {
    Game,
    Rule,
    Ship,
    Turn,
} = require('../../../../models');

const modelFactory = require('../../../factory');

const gameService = require('../../../../services/game');

module.exports = () => {
    describe('getGame()', () => {
        let sandbox;

        let rule;
        let ships;
        let turns;

        let game;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [rule] = modelFactory(Rule);
            ships = modelFactory(Ship, {}, {}, 4);
            turns = modelFactory(Turn, {}, {}, 4);

            [game] = modelFactory(Game, {
                ruleId: rule.id,
                rule,
                ships,
                turns,
            });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw rule not found', async () => {
            sandbox.stub(Game, 'findByPk')
                .resolves(null);

            try {
                await gameService.getGame(1);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipError');
                assert.equal(err.message, 'Game not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should return game', async () => {
            sandbox.stub(Game, 'findByPk')
                .resolves(game);

            const actual = await gameService.getGame(1);
            assert.equal(actual, game);
        });
    });
};
