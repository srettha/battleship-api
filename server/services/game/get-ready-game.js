const HttpStatus = require('http-status');
const { Op } = require('sequelize');

const {
    Game,
    Rule,
    Ship,
    Turn,
} = require('../../models');

const { BattleshipError } = require('../../utilities');

const gameInformationService = require('../game-informations');

/**
 * Get draft or in-progress game
 * @returns {Promise<Game>}
 */
module.exports = async () => {
    const game = await Game.findOne({
        include: [
            {
                as: 'rule',
                model: Rule,
                include: {
                    as: 'ships',
                    model: Ship,
                    through: {
                        attributes: ['number'],
                    },
                },
            },
            {
                as: 'turns',
                model: Turn,
            },
        ],
        order: [
            ['id', 'DESC'],
        ],
        where: {
            status: {
                [Op.or]: ['draft', 'in-progress'],
            },
        },
    });

    if (!game) {
        throw new BattleshipError('Last game is either aborted or finished', HttpStatus.NOT_FOUND);
    }

    const ships = await gameInformationService.getGameInformations(game.id);

    game.ships = ships;

    return game;
};
