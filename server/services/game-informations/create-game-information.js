const { GameInformations } = require('../../models');

const { BattleshipValidationError } = require('../../errors');

/**
 * Create game information
 * @param {Object} createObj
 * @param {String} createObj.coordinateX
 * @param {String} createObj.coordinateY
 * @param {Boolean} createObj.isHorizontal
 * @param {Number} createObj.gameId
 * @param {Number} createObj.shipId
 * @param {Number} createObj.baseHealth
 * @param {Number} createObj.health
 * @param {Object} sequelizeOptions
 * @returns {Promise<GameInformation>}
 */
module.exports = async (createObj, sequelizeOptions = {}) => {
    const isExisted = await GameInformations.findOne({
        where: createObj,
    });

    if (isExisted) {
        throw new BattleshipValidationError('Duplicated Game information', createObj);
    }

    const gameInformation = await GameInformations.create(createObj, sequelizeOptions);
    return gameInformation;
};
