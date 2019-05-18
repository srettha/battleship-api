const HttpStatus = require('http-status');
const _ = require('lodash');
const { Op } = require('sequelize');

const { GameInformations } = require('../../models');

const { BattleshipError } = require('../../utilities');

/**
 * Get game information based on coordinate
 * @param {Object} coordinate
 * @param {Number} coordinate.x
 * @param {Number} coordinate.y
 * @param {Object} queryObj
 * @param {Number} queryObj.shipId
 * @param {Number} queryObj.gameId
 * @returns {Promise<GameInformations>}
 */
module.exports = async (coordinate, queryObj) => {
    const mergedQueryObj = _.merge({
        health: {
            [Op.gt]: 0,
        },
    }, queryObj);

    const gameInformations = await GameInformations.findAll(mergedQueryObj);

    if (!gameInformations.length) {
        throw new BattleshipError('Game information not found', HttpStatus.NOT_FOUND);
    }

    if (gameInformations.length === 1) {
        return [gameInformations];
    }

    return _.find(
        gameInformations,
        gameInformation => gameInformation.coordinateX <= coordinate.x
            && coordinate.x <= gameInformation.endCoordinateX
            && gameInformation.coordinateY <= coordinate.y
            && coordinate.y <= gameInformation.endCoordinateY,
    );
};
