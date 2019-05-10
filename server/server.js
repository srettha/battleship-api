const debug = require('debug')('battle-api:server');

const app = require('./app');

app.listen(app.get('port'));

app.on('listening', () => {
    debug(`Server ready at http://localhost:${app.get('port')}`);
});

app.on('error', (err) => {
    debug(err);

    debug(`Failed to start server on port: ${app.get('port')}, error code: ${err.code}`);
    process.exit(1);
});
