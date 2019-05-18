const createGameTest = require('./create-game.test');
const deleteGameTest = require('./delete-game.test');
const getDraftGameTest = require('./get-draft-game.test');
const getGameStatusTest = require('./get-game-status.test');
const getGameTest = require('./get-game.test');
const getGamesTest = require('./get-games.test');
const getReadyGameTest = require('./get-ready-game.test');
const resetGameTest = require('./reset-game.test');
const startGameTest = require('./start-game.test');
const updateGameStateTest = require('./update-game-state.test');
const updateGameTest = require('./update-game.test');

describe('services/game', () => {
    createGameTest();
    deleteGameTest();
    getDraftGameTest();
    getGameStatusTest();
    getGameTest();
    getGamesTest();
    getReadyGameTest();
    resetGameTest();
    startGameTest();
    updateGameStateTest();
    updateGameTest();
});
