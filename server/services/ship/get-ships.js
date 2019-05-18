const { Ship } = require('../../models');

/**
 * Get ships from Database
 * @param {Object} sequelizeOptions
 * @returns {Promise<Array<Ship>>}
 */
module.exports = async (sequelizeOptions = {}) => {
    const ships = await Ship.findAll(sequelizeOptions);
    return ships;
};
