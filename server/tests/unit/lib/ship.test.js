const chai = require('chai');
const _ = require('lodash');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const ShipPlacement = require('../../../lib/ship');

module.exports = () => {
    describe('ship', () => {
        let ruleShips;
        let placedShips;

        beforeEach(() => {
            ruleShips = [
                {
                    id: 1,
                    name: 'Battleship',
                    life: 4,
                    RuleShips: { number: 1 },
                },
                {
                    id: 2,
                    name: 'Cruiser',
                    life: 3,
                    RuleShips: { number: 2 },
                },
            ];

            placedShips = [
                { id: 1 },
                { id: 2 },
                { id: 2 },
            ];
        });

        describe('getCurrentShips()', () => {
            it('should return current ships on ocean', () => {
                const shipPlacement = new ShipPlacement(ruleShips, placedShips);

                const actual = shipPlacement.getCurrentShips();
                assert.deepEqual(actual, [
                    {
                        id: 1,
                        name: 'Battleship',
                        life: 4,
                        number: 0,
                    },
                    {
                        id: 2,
                        name: 'Cruiser',
                        life: 3,
                        number: 0,
                    },
                ]);
            });
        });

        describe('isFleetEmpty()', () => {
            it('should return true for empty fleet', () => {
                const shipPlacement = new ShipPlacement(ruleShips, placedShips);

                const actual = shipPlacement.isFleetEmpty();
                assert.isTrue(actual);
            });
        });

        describe('isPlacable()', () => {
            it('should return false for placable ship', () => {
                const shipPlacement = new ShipPlacement(ruleShips, placedShips);

                const actual = shipPlacement.isPlaceable({ id: 1, coordinateX: 10, coordinateY: 10 });
                assert.isFalse(actual);
            });

            it('should return true for placable ship', () => {
                const shipPlacement = new ShipPlacement(_.concat(ruleShips, {
                    id: 3,
                    name: 'Destroyer',
                    life: 2,
                    RuleShips: { number: 3 },
                }), placedShips);

                const actual = shipPlacement.isPlaceable({ id: 3, coordinateX: 10, coordinateY: 10 });
                assert.isTrue(actual);
            });
        });
    });
};
