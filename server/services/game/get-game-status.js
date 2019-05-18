const _ = require('lodash');

const GameLogic = require('../../lib/game');

const getReadyGame = require('./get-ready-game');

/**
 * Get current game status
 */
module.exports = async () => {
    const game = await getReadyGame();

    const gameLogic = new GameLogic(game.rule, game.ships, game.turns);

    const ships = _.chain(game.ships)
        .map((ship) => {
            const matchedShip = _.find(game.rule.ships, ['id', ship.id]);
            return {
                name: matchedShip.name,
                baseHealth: ship.baseHealth,
                currentHealth: ship.health,
                isHorizontal: ship.isHorizontal,
                coordinateX: ship.coordinateX,
                coordinateY: ship.coordinateY,
                endingCoordinateX: ship.endingCoordinateX,
                endingCoordinateY: ship.endingCoordinateY,
            };
        })
        .values();

    const turns = _.chain(game.turns)
        .map(turn => _.pick(turn, ['coordinateX', 'coordinateY', 'status']))
        .values();

    return {
        ocean: gameLogic.getLayout(),
        rule: {
            x: game.rule.coordinateX,
            y: game.rule.coordinateY,
        },
        ships,
        turns,
    };
};
