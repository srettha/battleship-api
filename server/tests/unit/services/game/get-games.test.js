const chai = require('chai');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { Game, Rule } = require('../../../../models');

const modelFactory = require('../../../factory');

const gameService = require('../../../../services/game');

module.exports = () => {
    describe('getGames()', () => {
        let sandbox;

        let rule;

        let games;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [rule] = modelFactory(Rule);
            games = modelFactory(Game, { ruleId: rule.id, rule }, {}, 4);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return games', async () => {
            sandbox.stub(Game, 'findAll')
                .resolves(games);

            const actual = await gameService.getGames();
            assert.deepEqual(actual, games);
        });
    });
};
