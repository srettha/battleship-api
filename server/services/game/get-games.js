const { Game, Rule } = require('../../models');

/**
 * Get games from Database
 * @returns {Promise<Array<Game>>}
 */
module.exports = async () => {
    const games = await Game.findAll({
        include: [
            {
                as: 'rule',
                model: Rule,
            },
        ],
    });

    return games;
};
