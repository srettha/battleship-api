const HttpStatus = require('http-status');

const { sequelize } = require('../../models');

const { BattleshipError } = require('../../utilities');

const GameLogic = require('../../lib/game');
const ShipPlacement = require('../../lib/ship');

const ruleService = require('../rule');
const shipService = require('../ship');

const gameInformationService = require('../game-informations');

const createGame = require('./create-game');
const getDraftGame = require('./get-draft-game');

/**
 * Start game
 * @param {Object} gameObj
 * @param {String} gameObj.name
 * @param {Object} gameObj.coordinate
 * @param {Number} gameObj.coordinate.x
 * @param {Number} gameObj.coordinate.y
 * @param {String} gameObj.direction
 * @param {Object} [gameObj.ruleCoordinate]
 * @param {Number} gameObj.ruleCoordinate.coordinateX
 * @param {Number} gameObj.ruleCoordinate.coordinateY
 * @returns {Promise<void>}
 */
module.exports = async ({
    name,
    coordinate,
    direction,
    ruleCoordinate = {
        coordinateX: 10,
        coordinateY: 10,
    },
}) => {
    const ship = await shipService.getShipWithName(name);
    const rule = await ruleService.getRuleWithCoordinates(ruleCoordinate);

    let game = await getDraftGame();

    const isHorizontal = direction === 'horizontal';
    const shipObj = {
        coordinateX: coordinate.x,
        coordinateY: coordinate.y,
        life: ship.life,
        isHorizontal,
    };

    if (!game) {
        const transaction = await sequelize.transaction();

        const shipPlacement = new ShipPlacement(rule.ships, []);

        if (!shipPlacement.isPlaceable(ship)) {
            throw new BattleshipError('Ship placement does not allow or illegal', HttpStatus.BAD_REQUEST);
        }

        const gamelogic = new GameLogic(rule, []);

        if (gamelogic.isAdjacent(shipObj) || gamelogic.isOverlay(shipObj)) {
            throw new BattleshipError('Ship placement does not allow or illegal', HttpStatus.BAD_REQUEST);
        }

        try {
            game = await createGame({
                ruleId: rule.id,
            }, { transaction });

            await gameInformationService.createGameInformation({
                coordinateX: coordinate.x,
                coordinateY: coordinate.y,
                endCoordinateX: isHorizontal ? (coordinate.x + ship.life) - 1 : coordinate.x,
                endCoordinateY: !isHorizontal ? (coordinate.y + ship.life) - 1 : coordinate.y,
                isHorizontal,
                gameId: game.id,
                shipId: ship.id,
                baseHealth: ship.life,
                health: ship.life,
            }, { transaction });

            await transaction.commit();
            return;
        } catch (err) {
            await transaction.rollback();
            throw new BattleshipError(err);
        }
    }

    const shipPlacement = new ShipPlacement(rule.ships, game.ships);

    if (!shipPlacement.isPlaceable(ship)) {
        throw new BattleshipError('Ship placement does not allow or illegal', HttpStatus.BAD_REQUEST);
    }

    const gamelogic = new GameLogic(rule, game.ships);

    if (gamelogic.isAdjacent(shipObj) || gamelogic.isOverlay(shipObj)) {
        throw new BattleshipError('Ship placement does not allow or illegal', HttpStatus.BAD_REQUEST);
    }

    await gameInformationService.createGameInformation({
        coordinateX: coordinate.x,
        coordinateY: coordinate.y,
        endCoordinateX: isHorizontal ? coordinate.x + ship.life : coordinate.x,
        endCoordinateY: !isHorizontal ? coordinate.y + ship.life : coordinate.y,
        isHorizontal,
        gameId: game.id,
        shipId: ship.id,
        baseHealth: ship.life,
        health: ship.life,
    });
};
