const express = require('express');

const gameController = require('../controllers/game');
const shipController = require('../controllers/ship');
const turnController = require('../controllers/turn');

const { createJoiValidation } = require('../middlewares');
const { setRoutes } = require('../utilities');

const router = express.Router();

const routes = [
    {
        path: '/',
        method: 'GET',
        handler: gameController.status,
    },
    {
        path: '/attack',
        method: 'POST',
        middleware: [
            createJoiValidation(turnController.attack.requestSchema),
        ],
        handler: turnController.attack,
    },
    {
        path: '/reset',
        method: 'POST',
        handler: gameController.reset,
    },
    {
        path: '/ship',
        method: 'POST',
        middleware: [
            createJoiValidation(shipController.place.requestSchema),
        ],
        handler: shipController.place,
    },
];

setRoutes(router, routes);

module.exports = router;
