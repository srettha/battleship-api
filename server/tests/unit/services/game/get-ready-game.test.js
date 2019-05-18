const chai = require('chai');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const {
    Game,
    GameInformations,
    Rule,
    Ship,
    Turn,
} = require('../../../../models');

const modelFactory = require('../../../factory');

const gameService = require('../../../../services/game');

module.exports = () => {
    describe('getReadyGame()', () => {
        let sandbox;

        let rule;
        let ships;
        let turns;

        let game;

        let gameInformations;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [rule] = modelFactory(Rule);
            ships = modelFactory(Ship, {}, {}, 4);
            turns = modelFactory(Turn, {}, {}, 4);

            rule.ships = ships;

            game = modelFactory(
                Game,
                {
                    ruleId: rule.id,
                    rule,
                    turns,
                },
                {
                    include: [
                        {
                            as: 'rule',
                            model: Rule,
                            include: [
                                {
                                    as: 'ships',
                                    model: Ship,
                                },
                            ],
                        },
                        {
                            as: 'turns',
                            model: Turn,
                        },
                    ],
                },
            );
            gameInformations = modelFactory(GameInformations, { gameId: 1 }, {}, 4);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw an error', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(null);

            try {
                await gameService.getReadyGame();
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Last game is either aborted or finished');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should return ready game', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(game);

            sandbox.stub(GameInformations, 'findAll')
                .resolves(gameInformations);

            game.ships = ships;

            const actual = await gameService.getReadyGame();
            assert.deepEqual(actual, game);
        });
    });
};
