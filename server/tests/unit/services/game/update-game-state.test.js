const chai = require('chai');
const _ = require('lodash');
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
    describe('updateGameState()', () => {
        let sandbox;

        let rule;
        let ships;
        let turn;
        let turns;

        let game;

        let gameInformation;
        let gameInformations;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [rule] = modelFactory(Rule);
            ships = modelFactory(Ship, {}, {}, 4);
            turn = modelFactory(Turn);
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

            gameInformation = modelFactory(GameInformations, { gameId: 1, shipId: 1 });
            gameInformations = modelFactory(GameInformations, { gameId: 1 }, {}, 4);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return updated game state', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(game);

            sandbox.stub(GameInformations, 'findAll')
                .resolves(gameInformations);

            game.ships = ships;
            game.turns = _.concat(game.turns, turn);

            const actual = await gameService.updateGameState(game, turn, gameInformation);
            assert.deepEqual(actual, game);
        });
    });
};
