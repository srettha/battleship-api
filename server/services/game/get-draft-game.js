const { Game } = require('../../models');

const gameInformationService = require('../game-informations');

/**
 * Get draft game
 * @returns {Promise<Game>}
 */
module.exports = async () => {
    const game = await Game.findOne({
        where: { status: 'draft' },
    });

    if (!game) {
        return null;
    }

    const ships = await gameInformationService.getGameInformations(game.id);

    game.ships = ships;

    return game;
};
