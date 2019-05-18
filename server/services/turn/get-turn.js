const { Turn } = require('../../models');

/**
 * Get turn from database
 * @param {Object} queryObj
 * @param {Number} [queryObj.coordinateX]
 * @param {Number} [queryObj.coordinateY]
 * @param {Number} [queryObj.gameId]
 * @param {Promise<Turn>}
 */
module.exports = async (queryObj) => {
    const turn = await Turn.findOne({
        where: queryObj,
    });

    return turn;
};
