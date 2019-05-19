const HttpStatus = require('http-status');

const { Turn } = require('../../models');

const { BattleshipError } = require('../../errors');

const getTurn = require('./get-turn');

/**
 * Create turn
 * @param {Object} createObj
 * @param {Object} [options]
 */
module.exports = async (createObj, options = {}) => {
    const isExisted = await getTurn(createObj);
    if (isExisted) {
        throw new BattleshipError('Player needs to place all ships before start attacking', HttpStatus.UNAUTHORIZED);
    }

    const turn = await Turn.create(createObj, options);
    return turn;
};
