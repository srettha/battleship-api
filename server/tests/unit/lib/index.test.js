const GameLogicTest = require('./game.test');
const ShipPlacementTest = require('./ship.test');

describe('lib', () => {
    GameLogicTest();
    ShipPlacementTest();
});
