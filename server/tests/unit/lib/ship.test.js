const chai = require('chai');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const ShipPlacement = require('../../../lib/ship');

module.exports = () => {
    describe('ship', () => {
        const ruleShips = [
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
        const placedShips = [
            { id: 1 },
            { id: 2 },
            { id: 2 },
        ];

        const shipPlacement = new ShipPlacement(ruleShips, placedShips);

        describe('getCurrentShips()', () => {
            it('should return current ships on ocean', () => {
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
                const actual = shipPlacement.isFleetEmpty();
                assert.isTrue(actual);
            });
        });

        describe('isPlacable()', () => {
            it('should return false for placable ship', () => {
                const actual = shipPlacement.isPlaceable({ id: 1, coordinateX: 10, coordinateY: 10 });
                assert.isFalse(actual);
            });
        });
    });
};
