const createShipTest = require('./create-ship.test');
const deleteShipTest = require('./delete-ship.test');
const getShipWithNameTest = require('./get-ship-with-name.test');
const getShipTest = require('./get-ship.test');
const getShipsTest = require('./get-ships.test');
const updateShipTest = require('./update-ship.test');

describe('services/ship', () => {
    createShipTest();
    deleteShipTest();
    getShipWithNameTest();
    getShipTest();
    getShipsTest();
    updateShipTest();
});
