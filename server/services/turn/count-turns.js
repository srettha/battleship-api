const { Turn } = require('../../models');

/**
 * Count both number of hit and miss from turns based on gameId
 * @param {Number} gameId
 * @returns {Object}
 */
module.exports = async (gameId) => {
    const [hit, miss] = await Promise.all([
        Turn.count({
            where: {
                gameId,
                status: 'hit',
            },
        }),
        Turn.count({
            where: {
                gameId,
                status: 'miss',
            },
        }),
    ]);

    return { hit, miss };
};
