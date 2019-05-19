const HttpStatus = require('http-status');

class BattleshipValidationError extends Error {
    constructor(message, meta = {}) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = HttpStatus.BAD_REQUEST;
        this.meta = meta;
    }
}

module.exports = BattleshipValidationError;
