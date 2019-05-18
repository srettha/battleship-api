const _ = require('lodash');

/**
 * Update game information based on updated information
 * @param {Object} game
 * @param {Object} turn
 * @param {Object} ship
 * @returns {Object}
 */
module.exports = (game, turn, updatedShip) => {
    _.forEach(game.ships, (ship) => {
        if (ship.id === updatedShip.shipId) {
            ship.health = updatedShip.health;
        }
    });
    game.turns = _.concat(game.turns, turn);

    return game;
};
