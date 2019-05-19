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
} = DB;

const modelFactory = require('../../../factory');

const gameService = require('../../../../services/game');

const GameLogic = require('../../../../lib/game');
const ShipPlacement = require('../../../../lib/ship');

module.exports = () => {
    describe('startGame()', () => {
        let sandbox;

        const startGameObj = {
            name: 'Battleship',
            coordinate: { x: 10, y: 10 },
            direction: 'horizontal',
            ruleCoordinate: {
                coordinateX: 10,
                coordinateY: 10,
            },
        };

        let ship;
        let ships;

        let rule;

        let game;
        let gameInformation;
        let gameInformations;

        before(() => {
            sandbox = sinon.createSandbox();

            [ship] = modelFactory(Ship, { id: 1, name: 'Battleship' });
            ships = modelFactory(Ship, { id: faker.random.number(100), number: faker.random.number(100) }, {}, 4);

            [rule] = modelFactory(Rule, { ruleShips: ships }, { include: [{ as: 'ships', model: Ship }] });

            gameInformations = modelFactory(GameInformations, {}, {}, 4);
            [game] = modelFactory(Game, { status: 'draft' });

            gameInformation = modelFactory(GameInformations);
        });

        beforeEach(() => {
            sandbox.stub(Ship, 'findOne')
                .resolves(ship);
            sandbox.stub(Rule, 'findOne')
                .resolves(rule);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('[new-game] should throw an error (exceed ocean)', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(null);
            sandbox.stub(sequelize, 'transaction')
                .resolves({ commit: Promise.resolve() });

            sandbox.stub(ShipPlacement.prototype, 'isPlaceable')
                .returns(false);

            try {
                await gameService.startGame(startGameObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipValidationError');
                assert.equal(err.message, 'Ship placement does not allow or illegal');
                assert.equal(err.statusCode, HttpStatus.BAD_REQUEST);
            }
        });

        it('[new-game] should throw an error (adjacent or overlay)', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(null);
            sandbox.stub(sequelize, 'transaction')
                .resolves({ commit: Promise.resolve() });

            sandbox.stub(ShipPlacement.prototype, 'isPlaceable')
                .returns(true);

            sandbox.stub(GameLogic.prototype, 'isAdjacent')
                .returns(true);

            sandbox.stub(GameLogic.prototype, 'isOverlay')
                .returns(true);

            try {
                await gameService.startGame(startGameObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipValidationError');
                assert.equal(err.message, 'Ship placement does not allow or illegal');
                assert.equal(err.statusCode, HttpStatus.BAD_REQUEST);
            }
        });

        it('[new-game] should create game and game information', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(null);
            sandbox.stub(sequelize, 'transaction')
                .resolves({ commit() { return Promise.resolve(); } });

            sandbox.stub(ShipPlacement.prototype, 'isPlaceable')
                .returns(true);

            sandbox.stub(GameLogic.prototype, 'isAdjacent')
                .returns(false);

            sandbox.stub(GameLogic.prototype, 'isOverlay')
                .returns(false);

            sandbox.stub(Game, 'create')
                .resolves(game);

            sandbox.stub(GameInformations, 'findOne')
                .resolves(null);

            sandbox.stub(GameInformations, 'create')
                .resolves(gameInformation);

            await gameService.startGame(startGameObj);
            assert.called(Game.create);
            assert.called(GameInformations.create);
        });

        it('[continue-game] should throw an error (exceed ocean)', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(game);
            sandbox.stub(GameInformations, 'findAll')
                .resolves(gameInformations);

            sandbox.stub(ShipPlacement.prototype, 'isPlaceable')
                .returns(false);

            try {
                await gameService.startGame(startGameObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipValidationError');
                assert.equal(err.message, 'Ship placement does not allow or illegal');
                assert.equal(err.statusCode, HttpStatus.BAD_REQUEST);
            }
        });

        it('[continue-game] should throw an error (adjacent or overlay)', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(game);
            sandbox.stub(GameInformations, 'findAll')
                .resolves(gameInformations);

            sandbox.stub(ShipPlacement.prototype, 'isPlaceable')
                .returns(true);

            sandbox.stub(GameLogic.prototype, 'isAdjacent')
                .returns(true);

            sandbox.stub(GameLogic.prototype, 'isOverlay')
                .returns(true);

            try {
                await gameService.startGame(startGameObj);
                assert.fail('it should fail but pass');
            } catch (err) {
                assert.equal(err.name, 'BattleshipValidationError');
                assert.equal(err.message, 'Ship placement does not allow or illegal');
                assert.equal(err.statusCode, HttpStatus.BAD_REQUEST);
            }
        });

        it('[continue-game] should create game information', async () => {
            sandbox.stub(Game, 'findOne')
                .resolves(game);
            sandbox.stub(GameInformations, 'findAll')
                .resolves(gameInformations);

            sandbox.stub(ShipPlacement.prototype, 'isPlaceable')
                .returns(true);

            sandbox.stub(GameLogic.prototype, 'isAdjacent')
                .returns(false);

            sandbox.stub(GameLogic.prototype, 'isOverlay')
                .returns(false);

            sandbox.stub(GameInformations, 'findOne')
                .resolves(null);

            sandbox.stub(GameInformations, 'create')
                .resolves(gameInformation);

            await gameService.startGame(startGameObj);
            assert.called(GameInformations.create);
        });
    });
};
