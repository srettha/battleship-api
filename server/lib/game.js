const Table = require('cli-table');
const _ = require('lodash');

class Game {
    /**
     * @constructor
     * @param {Object} rule
     * @param {Array<Ship>} ships
     * @param {Array<Turn>} shoots
     */
    constructor(rule, ships = [], shoots = []) {
        this.x = rule.coordinateX;
        this.y = rule.coordinateY;
        this.layout = Array(this.x).fill().map(() => Array(this.y).fill(0));
        this.ships = ships;
        this.shoots = shoots;

        this.placeShips();
        this.placeShoots();
    }

    /**
     * @public
     * Get game layout
     * @returns {Array<String>}
     */
    getLayout() {
        const table = new Table({});
        _.forEach(this.layout, l => table.push(l));

        return table.toString().split('\n');
    }

    /**
     * @public
     * Check whether new ship is adjacent to old one or not
     * @param {Object} ship
     * @returns {Boolean}
    */
    isAdjacent(ship) {
        const { coordinateX, coordinateY } = ship;
        const coX = coordinateX > 0
            ? coordinateX - 1
            : coordinateX;
        const coY = coordinateY > 0
            ? coordinateY - 1
            : coordinateY;

        const { coMaxX, coMaxY } = this.manageCoordinate(ship);

        for (let i = coY - 1; i <= coMaxY - 1; i += 1) {
            if (i > 0 || i < this.x - 1) {
                for (let j = coX - 1; j <= coMaxX - 1; j += 1) {
                    if (j > 0 || j < this.y - 1) {
                        if (this.layout[i][j] > 0) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    /**
     * @public
     * Check whether game has come to an end yet?
     * @returns {Boolean}
     */
    endGame() {
        for (let i = 0; i < this.x; i += 1) {
            for (let j = 0; j < this.y; j += 1) {
                if (this.layout[j][i] > 0) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * @public
     * Check whether new ship is overlay to old one or not
     * @param {Object} ship
     * @returns {Boolean}
     */
    isOverlay(ship) {
        const { coordinateX, coordinateY, isHorizontal } = ship;

        let coX = coordinateX - 1;
        let coY = coordinateY - 1;

        for (let i = 0; i < ship.life; i += 1) {
            if (this.layout[coY][coX] > 0) {
                return true;
            }

            if (isHorizontal) {
                coX += 1;
            } else {
                coY += 1;
            }
        }

        return false;
    }

    /**
     * @private
     * Manage coordinate before running it with other function
     * @param {Object} ship
     * @returns {Object}
     */
    manageCoordinate(ship) {
        const { coordinateX, coordinateY, isHorizontal } = ship;

        let coMaxX;
        let coMaxY;

        if (isHorizontal) {
            if ((coordinateX + ship.life) > this.x) {
                coMaxX = this.x;
            } else {
                coMaxX = coordinateX + ship.life;
            }

            if ((coordinateY + 1) > this.y) {
                coMaxY = this.y;
            } else {
                coMaxY = coordinateY + 1;
            }
        } else {
            if ((coordinateX + 1) > this.x) {
                coMaxX = this.x;
            } else {
                coMaxX = coordinateX + 1;
            }

            if ((coordinateY + ship.life) > this.y) {
                coMaxY = this.y;
            } else {
                coMaxY = coordinateY + ship.life;
            }
        }

        return { coMaxX, coMaxY };
    }

    /**
     * Lay down ships to the ocean
     */
    placeShips() {
        _.forEach(this.ships, (ship) => {
            const coX = ship.coordinateX - 1;
            const coY = ship.coordinateY - 1;

            for (let i = 0; i < ship.baseHealth; i += 1) {
                if (ship.isHorizontal) {
                    this.layout[coY][coX + i] = ship.id;
                } else {
                    this.layout[coY + i][coX] = ship.id;
                }
            }
        });
    }

    /**
     * Lay down shoots to the ocean
     */
    placeShoots() {
        _.forEach(this.shoots, (shoot) => {
            const coX = shoot.coordinateX - 1;
            const coY = shoot.coordinateY - 1;

            if (this.layout[coY][coX] > 0) {
                this.layout[coY][coX] = -2;
            } else {
                this.layout[coY][coX] = -1;
            }
        });
    }

    /**
     * @public
     * Shoot at coordinate x and y on ocean
     * @param {Number} x
     * @param {Number} y
     * @returns {}
     */
    shoot(coordinateX, coordinateY) {
        const coX = coordinateX - 1;
        const coY = coordinateY - 1;

        if (this.layout[coY][coX] > 0) {
            return { status: 'hit', shipId: this.layout[coY][coX] };
        }

        return { status: 'miss' };
    }
}

module.exports = Game;
