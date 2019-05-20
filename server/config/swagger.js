const config = require('config');
const SwaggerJSDoc = require('swagger-jsdoc');

const { author: { email }, description, version } = require('../package.json');

const options = {
    definition: {
        basePath: '/api',
        host: `localhost:${config.get('app.port')}`,
        info: {
            title: 'Battleship API',
            version,
            description,
            contact: {
                email,
            },
        },
        schemes: ['http'],
    },
    apis: ['./routes/*.js', './routes/*.yml'],
};

module.exports = SwaggerJSDoc(options);
