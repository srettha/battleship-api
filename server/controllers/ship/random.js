const HttpStatus = require('http-status');

module.exports = async (_req, res) => {
    res.status(HttpStatus.CREATED).json({
        message: 'Randomly placed ship on the ocean',
    });
};
