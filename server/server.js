const debug = require('debug')('battleship-api:server');

const app = require('./app');

app.listen(app.get('port'), () => {
    debug(`Server ready at http://localhost:${app.get('port')}`);
});

app.on('error', (err) => {
    debug(err);

    debug(`Failed to start server on port: ${app.get('port')}, error code: ${err.code}`);
    process.exit(1);
});
