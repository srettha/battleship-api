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
    describe('updateGame()', () => {
        let sandbox;

        let rule;
        let ships;
        let turns;

        let game;

        let gameObj;

        const id = 1;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [rule] = modelFactory(Rule);
            ships = modelFactory(Ship, {}, {}, 4);
            turns = modelFactory(Turn, {}, {}, 4);

            gameObj = {
                id,
                status: 'in-progress',
                ruleId: rule.id,
                ships,
                turns,
            };
            [game] = modelFactory(Game, gameObj);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw game not found', async () => {
            sandbox.stub(Game, 'update')
                .resolves([0, []]);

            try {
                await gameService.updateGame({ id }, gameObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Game not found');
                assert.equal(err.statusCode, HttpStatus.NOT_FOUND);
            }
        });

        it('should update game', async () => {
            sandbox.stub(Game, 'update')
                .resolves([1, [game]]);

            const actual = await gameService.updateGame({ id }, gameObj);
            assert.equal(actual, game);
        });
    });
};
