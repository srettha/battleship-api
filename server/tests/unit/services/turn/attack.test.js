const chai = require('chai');
const faker = require('faker');
const HttpStatus = require('http-status');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const DB = require('../../../../models');

const { sequelize } = DB;

const {
    Game,
    GameInformations,
    Rule,
    Ship,
    Turn,
} = DB;

const modelFactory = require('../../../factory');

const turnService = require('../../../../services/turn');

const GameLogic = require('../../../../lib/game');
const ShipPlacement = require('../../../../lib/ship');

module.exports = () => {
    describe('attack()', () => {
        let sandbox;

        const name = 'Submarine';
        const coordinate = { x: faker.random.number(10), y: faker.random.number(10) };

        let ship;

        let turn;

        let rule;
        let ships;

        let gameInformation;
        let gameInformations;

        let sankGameInformation;

        let game;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            [ship] = modelFactory(Ship, { name });

            ships = modelFactory(Ship, { id: faker.random.number(10), number: faker.random.number(100) }, {}, 4);

            [rule] = modelFactory(Rule, { ruleShips: ships }, { include: [{ as: 'ships', model: Ship }] });

            gameInformations = modelFactory(GameInformations, {}, {}, 4);

            [game] = modelFactory(Game, { ruleId: rule.id, rule, status: 'draft' }, { include: [{ as: 'rule', model: Rule }] });

            turn = modelFactory(Turn, { coordinateX: coordinate.x, coordinateY: coordinate.y, gameId: game.id });

            gameInformation = modelFactory(GameInformations, {
                coordinateX: coordinate.x,
                coordinateY: coordinate.y,
                gameId: game.id,
                shipId: 10,
                health: 2,
            });

            sankGameInformation = modelFactory(GameInformations, {
                coordinateX: coordinate.x,
                coordinateY: coordinate.y,
                gameId: game.id,
                shipId: 10,
                health: 0,
            });

            game.ships = gameInformations;
            game.turns = [];

            sandbox.stub(Game, 'findOne')
                .resolves(game);
            sandbox.stub(GameInformations, 'findAll')
                .onFirstCall()
                .resolves(gameInformations)
                .onSecondCall()
                .resolves(gameInformation);
            sandbox.stub(sequelize, 'transaction')
                .resolves({ commit: () => Promise.resolve() });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should throw an error (fleet is not empty)', async () => {
            sandbox.stub(ShipPlacement.prototype, 'isFleetEmpty')
                .returns(false);

            try {
                await turnService.attack({ x: coordinate.x, y: coordinate.y });
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Player needs to place all ships before start attacking');
                assert.equal(err.statusCode, HttpStatus.UNAUTHORIZED);
            }
        });

        it('should throw an error (attack coordination does not allow)', async () => {
            sandbox.stub(ShipPlacement.prototype, 'isFleetEmpty')
                .returns(true);

            sandbox.stub(Turn, 'findOne')
                .resolves(turn);

            try {
                await turnService.attack({ x: coordinate.x, y: coordinate.y });
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.message, 'Attack coordination does not allow or illegal');
                assert.equal(err.statusCode, HttpStatus.BAD_REQUEST);
            }
        });

        it('should return miss status', async () => {
            sandbox.stub(Game, 'update')
                .resolves([1, [game]]);
            sandbox.stub(GameLogic.prototype, 'shoot')
                .returns({ status: 'miss' });
            sandbox.stub(Turn, 'findOne')
                .resolves(null);
            sandbox.stub(Turn, 'create')
                .resolves(turn);

            const actual = await turnService.attack(coordinate);
            assert.equal(actual.status, 'miss');
        });

        it('should return hit status', async () => {
            sandbox.stub(Game, 'update')
                .resolves([1, [game]]);
            sandbox.stub(GameLogic.prototype, 'shoot')
                .returns({ status: 'hit', shipId: 10 });
            sandbox.stub(Turn, 'findOne')
                .resolves(null);
            sandbox.stub(Turn, 'create')
                .resolves(turn);
            sandbox.stub(GameInformations, 'update')
                .resolves([1, gameInformation]);
            sandbox.stub(GameLogic.prototype, 'endGame')
                .returns(false);

            const actual = await turnService.attack(coordinate);
            assert.equal(actual.status, 'hit');
        });

        it('should return sand status with ship name', async () => {
            sandbox.stub(Game, 'update')
                .resolves([1, [game]]);
            sandbox.stub(GameLogic.prototype, 'shoot')
                .returns({ status: 'hit', shipId: 10 });
            sandbox.stub(Turn, 'findOne')
                .resolves(null);
            sandbox.stub(Turn, 'create')
                .resolves(turn);
            sandbox.stub(GameInformations, 'update')
                .resolves([1, sankGameInformation]);
            sandbox.stub(GameLogic.prototype, 'endGame')
                .returns(false);
            sandbox.stub(Ship, 'findOne')
                .resolves(ship);

            const actual = await turnService.attack(coordinate);
            assert.deepEqual(actual, { status: 'sank', name });
        });

        it('should return sand status with ship name', async () => {
            sandbox.stub(Game, 'update')
                .resolves([1, [game]]);
            sandbox.stub(GameLogic.prototype, 'shoot')
                .returns({ status: 'hit', shipId: 10 });
            sandbox.stub(Turn, 'findOne')
                .resolves(null);
            sandbox.stub(Turn, 'create')
                .resolves(turn);
            sandbox.stub(GameInformations, 'update')
                .resolves([1, sankGameInformation]);
            sandbox.stub(GameLogic.prototype, 'endGame')
                .returns(true);
            sandbox.stub(Turn, 'count')
                .onFirstCall()
                .resolves(10)
                .onSecondCall()
                .resolves(0);

            const actual = await turnService.attack(coordinate);
            assert.deepEqual(actual, { status: 'end', hit: 10, miss: 0 });
        });
    });
};
