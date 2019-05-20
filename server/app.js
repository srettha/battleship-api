const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const HttpStatus = require('http-status');
const _ = require('lodash');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./config/swagger');

const router = require('./routes');

const app = express();

app.set('port', config.get('app.port'));

app.use(bodyParser.json());

app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', router);

app.use((err, _req, res, next) => {
    if (!err) {
        next();
        return;
    }

    const errObj = _.pick(err, 'message', 'meta');
    let { statusCode } = err;

    if (!statusCode) {
        statusCode = err.constructor.name === 'AssertionError'
            ? HttpStatus.BAD_REQUEST
            : HttpStatus.BAD_GATEWAY;
    }

    res.status(statusCode).json(errObj);
});

module.exports = app;
