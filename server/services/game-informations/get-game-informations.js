const { GameInformations } = require('../../models');

/**
 * Get game information from gameId
 * @param {Number} gameId
 * @returns {Promise<Array<GameInformation>>}
 */
module.exports = async (gameId) => {
    const gameInformations = await GameInformations.findAll({
        attributes: [['ship_id', 'id'], 'coordinateX', 'coordinateY', 'isHorizontal', 'baseHealth', 'health'],
        where: { gameId },
    });

    return gameInformations;
};
