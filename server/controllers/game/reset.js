const HttpStatus = require('http-status');

const gameService = require('../../services/game');

module.exports = async (_req, res) => {
    await gameService.resetGame();
    res.status(HttpStatus.OK).json({
        message: 'reset successfully',
    });
};
