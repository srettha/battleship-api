const DB = require('../models');

const { Ship } = DB;

/**
 * Create new ship
 * @param {Object} queryObj
 */
async function createShip(queryObj) {
    const [ship, created] = await Ship.findOrCreate(queryObj, { default: queryObj });
    if (!created) {
        throw new Error('Duplicated Ship');
    }

    return ship;
}

/**
 * Soft delete ship
 * @param {Number} id
 */
async function deleteShip(id) {
    const count = await Ship.destroy(id);
    if (count === 0) {
        throw new Error('Ship not found');
    }

    return true;
}

/**
 * Get ship with primary key from database
 * @param {Number} id
 * @returns {Promise<Ship>}
 */
async function getShip(id) {
    const ship = await Ship.findByPk(id);
    return ship;
}

/**
 * Get ships from Database
 * @returns {Promise<Array<Ship>>}
 */
async function getShips() {
    const ships = await Ship.findAll();
    return ships;
}

/**
 * Update ship with id and updateObject
 * @param {Number} id
 * @param {Object} queryObj
 * @returns {Promise<Ship>}
 */
async function updateShip(id, queryObj) {
    const [count, [ship]] = await Ship.update(queryObj, {
        returning: true,
        where: { id },
    });

    if (count === 0) {
        throw new Error('Ship not found');
    }

    return ship;
}

module.exports = {
    createShip,
    deleteShip,
    getShip,
    getShips,
    updateShip,
};
