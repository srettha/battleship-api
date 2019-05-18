const { Turn } = require('../../models');

/**
 * Get turns from database
 * @param {Number} gameId
 * @returns {Promise<Array<Turn>>}
 */
module.exports = async (gameId) => {
    const turns = await Turn.findAll({
        where: { gameId },
    });

    return turns;
};
