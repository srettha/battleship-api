const createGame = require('./create-game');
const deleteGame = require('./delete-game');
const getDraftGame = require('./get-draft-game');
const getGame = require('./get-game');
const getGames = require('./get-games');
const getGameStatus = require('./get-game-status');
const getReadyGame = require('./get-ready-game');
const resetGame = require('./reset-game');
const startGame = require('./start-game');
const updateGame = require('./update-game');
const updateGameState = require('./update-game-state');

module.exports = {
    createGame,
    deleteGame,
    getDraftGame,
    getGame,
    getGames,
    getGameStatus,
    getReadyGame,
    resetGame,
    startGame,
    updateGame,
    updateGameState,
};
