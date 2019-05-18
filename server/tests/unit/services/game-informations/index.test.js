const createGameInformationTest = require('./create-game-information.test');
const getGameInformationWithCoordinateTest = require('./get-game-information-with-coordinates.test');
const getGameInformationTest = require('./get-game-information.test');
const getGameInformationsTest = require('./get-game-informations.test');
const updateGameInformationTest = require('./update-game-information.test');

describe('services/game-informations', () => {
    createGameInformationTest();
    getGameInformationWithCoordinateTest();
    getGameInformationTest();
    getGameInformationsTest();
    updateGameInformationTest();
});
