const chai = require('chai');
const _ = require('lodash');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const GameLogic = require('../../../lib/game');

module.exports = () => {
    describe('game', () => {
        let sandbox;

        let shipObj;

        const rule = { coordinateX: 10, coordinateY: 10 };
        const ships = [
            {
                id: 1,
                coordinateX: 10,
                coordinateY: 7,
                isHorizontal: false,
                baseHealth: 4,
            },
            {
                id: 4,
                coordinateX: 6,
                coordinateY: 6,
                isHorizontal: true,
                baseHealth: 1,
            },
        ];
        const shoots = [
            {
                coordinateX: 10,
                coordinateY: 7,
            },
            {
                coordinateX: 10,
                coordinateY: 8,
            },
            {
                coordinateX: 10,
                coordinateY: 9,
            },
            {
                coordinateX: 5,
                coordinateY: 5,
            },
        ];

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            shipObj = {
                coordinateX: 10,
                coordinateY: 10,
                isHorizontal: false,
                life: 1,
            };
        });

        afterEach(() => {
            sandbox.restore();
        });

        describe('endGame()', () => {
            it('should return true', () => {
                const newShipObj = _.concat(shoots, {
                    coordinateX: 10,
                    coordinateY: 10,
                }, { coordinateX: 6, coordinateY: 6 });
                const gameLogic = new GameLogic(rule, ships, newShipObj);
                const actual = gameLogic.endGame();
                assert.isTrue(actual);
            });

            it('should return false', () => {
                const gameLogic = new GameLogic(rule, ships, shoots);
                const actual = gameLogic.endGame();
                assert.isFalse(actual);
            });
        });

        describe('getLayout()', () => {
            it('should return layout of the game', () => {
                const gameLogic = new GameLogic(rule, ships, shoots);
                const actual = gameLogic.getLayout();
                assert.isArray(actual);
            });
        });

        describe('isAjacent()', () => {
            it('should return true', () => {
                const gameLogic = new GameLogic(rule, ships, shoots);
                const actual = gameLogic.isAdjacent(shipObj);
                assert.isTrue(actual);
            });

            it('should return false', () => {
                const gameLogic = new GameLogic(rule, ships, shoots);
                const actual = gameLogic.isAdjacent(_.merge(shipObj, { coordinateX: 5, isHorizontal: true }));
                assert.isFalse(actual);
            });
        });

        describe('isOverlay()', () => {
            it('should return true', () => {
                const gameLogic = new GameLogic(rule, ships, shoots);
                const actual = gameLogic.isOverlay(shipObj);
                assert.isTrue(actual);
            });

            it('should return false', () => {
                const gameLogic = new GameLogic(rule, ships, shoots);
                const actual = gameLogic.isOverlay(_.merge(shipObj, { coordinateX: 5, isHorizontal: true }));
                assert.isFalse(actual);
            });
        });

        describe('shoot()', () => {
            it('should return miss', () => {
                const gameLogic = new GameLogic(rule, ships, shoots);
                const actual = gameLogic.shoot(5, 5);
                assert.equal(actual.status, 'miss');
            });

            it('should return hit and shipId', () => {
                const gameLogic = new GameLogic(rule, ships, shoots);
                const actual = gameLogic.shoot(10, 10);
                assert.equal(actual.status, 'hit');
                assert.equal(actual.shipId, 1);
            });
        });
    });
};
