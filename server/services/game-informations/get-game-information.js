const { GameInformations } = require('../../models');

/**
 * Get game information from database
 * @param {Object} queryObj
 * @returns {Promise<GameInformations>}
 */
module.exports = async (queryObj) => {
    const gameInformation = await GameInformations.findOne({
        where: queryObj,
    });

    return gameInformation;
};
