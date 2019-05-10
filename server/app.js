const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');

const app = express();

app.use(bodyParser.json());

app.set('port', config.get('app.port'));

module.exports = app;
