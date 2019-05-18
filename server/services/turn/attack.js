const HttpStatus = require('http-status');

const { sequelize } = require('../../models');

const GameLogic = require('../../lib/game');
const ShipPlacement = require('../../lib/ship');

const { BattleshipError } = require('../../utilities');

const gameService = require('../game');
const gameInformationService = require('../game-informations');
const shipService = require('../ship');

const countTurns = require('./count-turns');
const createTurn = require('./create-turn');
const getTurn = require('./get-turn');

/**
 * Attack the ocean
 * @param {Object} coordinate
 * @param {Number} coordinate.x
 * @param {Number} coordinate.y
 */
module.exports = async (coordinate) => {
    const game = await gameService.getReadyGame();

    const shipPlacement = new ShipPlacement(game.rule.ships, game.ships);

    if (!shipPlacement.isFleetEmpty()) {
        throw new BattleshipError('Player needs to place all ships before start attacking', HttpStatus.UNAUTHORIZED);
    }

    const turn = await getTurn({ coordinateX: coordinate.x, coordinateY: coordinate.y, gameId: game.id });
    if (turn) {
        throw new BattleshipError('Attack coordination does not allow or illegal', HttpStatus.BAD_REQUEST);
    }

    const gameLogic = new GameLogic(game.rule, game.ships, game.turns);

    const transaction = await sequelize.transaction();

    try {
        await gameService.updateGame({ id: game.id }, { status: 'in-progress' }, { transaction });
        const { status, shipId } = gameLogic.shoot(coordinate.x, coordinate.y);

        const newTurn = await createTurn({
            coordinateX: coordinate.x,
            coordinateY: coordinate.y,
            status,
            gameId: game.id,
        }, { transaction });

        if (shipId) {
            const shipInformation = await gameInformationService.getGameInformationWithCoordinate(
                coordinate,
                {
                    gameId: game.id,
                    shipId,
                },
            );

            const updatedShipInformation = await gameInformationService.updateGameInformation({
                coordinateX: shipInformation.coordinateX,
                coordinateY: shipInformation.coordinateY,
                shipId,
                gameId: game.id,
            }, {
                health: shipInformation.health - 1,
            }, { transaction });

            const updatedGameState = gameService.updateGameState(game, newTurn, updatedShipInformation);
            const updateGameLogic = new GameLogic(
                updatedGameState.rule,
                updatedGameState.ships,
                updatedGameState.turns,
            );

            if (updateGameLogic.endGame()) {
                await gameService.updateGame({
                    id: game.id,
                }, {
                    status: 'finished',
                }, { transaction });
                await transaction.commit();

                const { hit, miss } = await countTurns(game.id);
                return { status: 'end', hit, miss };
            }

            await transaction.commit();

            if (updatedShipInformation.health === 0) {
                const ship = await shipService.getShip(shipId);
                return { status: 'sank', name: ship.name };
            }

            return { status };
        }

        await transaction.commit();
        return { status };
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};
