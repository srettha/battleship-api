const _ = require('lodash');

class Ship {
    constructor(rShips, pShips) {
        this.ruleShips = rShips;
        this.placedShips = pShips;
        this.currentShipsNumber = _.map(this.ruleShips, rShip => ({
            id: rShip.id,
            name: rShip.name,
            life: rShip.life,
            number: this.findCurrentNumber(rShip),
        }));
    }

    /**
     * @private
     * Find the remaining number of ship that can be placed
     * @param {Array<Ship>} ships
     * @param {Ship} ship
     * @returns {Number}
    */
    findCurrentNumber(ship) {
        let { number } = ship.RuleShips;

        _.forEach(this.placedShips, (s) => {
            if (s.id === ship.id) {
                number -= 1;
            }
        });

        return number;
    }

    /**
     * @public
     * Return current ships
     * @returns {Array<Ship>}
     */
    getCurrentShips() {
        return this.currentShipsNumber;
    }

    /**
     * @public
     * Check whether the fleet is empty or not
     * @returns {Boolean}
     */
    isFleetEmpty() {
        return _.every(this.currentShipsNumber, ['number', 0]);
    }

    /**
     * @public
     * Is this ship placable?
     * @param {Array<Ship>} rShips rule ships
     * @param {Array<Ship>} pShips placed ships
     * @param {Ship} ship
     * @returns {Boolean}
    */
    isPlaceable(ship = {}) {
        const ruleShip = _.find(this.currentShipsNumber, c => c.id === ship.id);
        if (ruleShip.number > 0) {
            return true;
        }

        return false;
    }
}

module.exports = Ship;
