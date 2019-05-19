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

const GameLogic = require('../../../../lib/game');

module.exports = () => {
    describe('getGameStatus()', () => {
        let sandbox;

        let rule;
        let ships;
        let turns;

        let game;
        let gameInformations;

        before(() => {
            sandbox = sinon.createSandbox();

            ships = modelFactory(Ship, { id: 1 }, {}, 4);

            [rule] = modelFactory(Rule, { ships }, { include: [{ as: 'ships', model: Ship }] });
            turns = [];
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw an error', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(null);

            try {
                await gameService.getGameStatus();
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Last game is either aborted or finished');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should return game with its status', async () => {
            [game] = modelFactory(
                Game,
                {
                    ruleId: rule.id,
                    rule,
                    ships,
                    turns,
                }, {
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
            gameInformations = modelFactory(GameInformations, { id: 1, gameId: 1 }, {}, 4);

            sandbox.stub(Game, 'findOne')
                .resolves(game);

            sandbox.stub(GameInformations, 'findAll')
                .resolves(gameInformations);

            sandbox.stub(GameLogic.prototype, 'getLayout')
                .returns([]);

            const actual = await gameService.getGameStatus();

            assert.deepEqual(actual.ocean, []);
            assert.equal(actual.rule.x, rule.coordinateX);
            assert.equal(actual.rule.y, rule.coordinateY);
            assert.exists(actual.ships);
            assert.exists(actual.turns);
        });
    });
};
