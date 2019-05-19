const HttpStatus = require('http-status');

class BattleshipError extends Error {
    constructor(message, statusCode = HttpStatus.BAD_GATEWAY, meta = {}) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.meta = meta;
    }
}

module.exports = BattleshipError;
