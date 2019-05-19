const _ = require('lodash');

/**
 * Check whether given function is async or not
 * @param {Function} fn
 * @returns {Boolean}
 */
function isAsyncFunction(fn) {
    return typeof fn === 'function' && fn.constructor && fn.constructor.name === 'AsyncFunction';
}

/**
 * Wrap async function with try...catch
 * @param {Function}
 * @returns {Function}
 */
function wrap(fn) {
    if (!isAsyncFunction(fn)) {
        return fn;
    }

    if (fn.length === 4) {
        return (err, req, res, next) => fn(err, req, res, next).catch(next);
    }

    return (req, res, next) => fn(req, res, next).catch(next);
}

/**
 * Wrap async functions with try...catch
 * @param {Array<Function>} fn
 * @returns {Array<Function>}
 */
function wrapAll(fns) {
    return _.map(fns, fn => wrap(fn));
}

/**
 * Set routes to router
 * @param {Router} router
 * @param {Object} routes
 * @param {Object} options
 * @returns {void}
 */
function setRoutes(router, routes) {
    _.forEach(routes, (route) => {
        if (!route.handler) {
            return;
        }

        let args = [];

        if (route.middleware) {
            args.push(wrapAll(route.middleware));
        }

        if (route.handler) {
            args.push(wrap(route.handler));
        }

        args = _.flatten(args);

        router[route.method.toLowerCase()](route.path, ...args);
    });
}

module.exports = {
    isAsyncFunction,
    setRoutes,
    wrap,
    wrapAll,
};
