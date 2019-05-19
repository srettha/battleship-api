const { Op } = require('sequelize');

const { Game } = require('../../models');

const { BattleshipValidationError } = require('../../errors');

/**
 * Create new game
 * It will try to find 'in-progress' game first whether
 * there is on-going game or not.
 * @param {Object} createObj
 * @param {Object} sequelizeOptions
 * @returns {Promise<Game>}
 */
module.exports = async (createObj, sequelizeOptions = {}) => {
    const isExisted = await Game.findOne({
        where: {
            status: {
                [Op.notIn]: ['aborted', 'finished'],
            },
        },
    });

    if (isExisted) {
        throw new BattleshipValidationError('Duplicated Game', createObj);
    }

    const game = await Game.create(createObj, sequelizeOptions);
    return game;
};
