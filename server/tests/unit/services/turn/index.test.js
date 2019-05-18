const attackTest = require('./attack.test');
const countTurnTest = require('./count-turn.test');
const createTurnTest = require('./create-turn.test');
const getTurnTest = require('./get-turn.test');
const getTurnsTest = require('./get-turns.test');

describe('services/turn', () => {
    attackTest();
    countTurnTest();
    createTurnTest();
    getTurnTest();
    getTurnsTest();
});
