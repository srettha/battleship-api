const HttpStatus = require('http-status');

const gameService = require('../../services/game');

module.exports = async (_req, res) => {
    const data = await gameService.getGameStatus();

    res.status(HttpStatus.OK).json({
        message: 'Current game status',
        data,
    });
};
