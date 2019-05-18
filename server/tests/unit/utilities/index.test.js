const chai = require('chai');
const express = require('express');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const utilities = require('../../../utilities');

describe('utilities', () => {
    let router;

    const normalFunc = (_req, _res, _next) => { };

    const asyncFunc = async function generator(_req, _res, _next) {
        await Promise.resolve();
    };

    const asyncErrorHandlingFunc = async function generator(_err, _req, _res, _next) {
        await Promise.resolve();
    };

    const validateNormalFunc = (func) => {
        assert.isFunction(utilities.wrap(func));
        assert.equal(utilities.wrap(func.constructor.name), 'Function');
    };

    describe('isAsyncFunction()', () => {
        it('should return false (not async function)', () => {
            const actual = utilities.isAsyncFunction(normalFunc);
            assert.isFalse(actual);
        });

        it('should return true (async function)', () => {
            const actual = utilities.isAsyncFunction(asyncFunc);
            assert.isTrue(actual);
        });
    });

    describe('setRoutes()', () => {
        it('should set routes to router', () => {
            router = express.Router();
            const spyRouter = sandbox.spy(router);
            const routes = [
                {
                    path: '/',
                    method: 'GET',
                    middleware: [],
                    handler: (_req, res) => res.status(200),
                },
            ];
            utilities.setRoutes(router, routes);
            assert.equal(spyRouter.stack[0].route.path, '/');
            assert.equal(spyRouter.stack[0].route.stack[0].method, 'get');
        });
    });

    describe('wrap()', async () => {
        it('should return an original function if the function is not of type async', () => {
            const wrappedFunc = utilities.wrap(normalFunc);
            validateNormalFunc(wrappedFunc);
        });

        it('should return the async function if a function is of type async', () => {
            const wrappedFunc = utilities.wrap(asyncFunc);
            validateNormalFunc(wrappedFunc);
            assert.equal(wrappedFunc.length, 3);
        });

        it('should return same number of arguments when wrap async error-handling function', () => {
            const wrappedFunc = utilities.wrap(asyncErrorHandlingFunc);
            validateNormalFunc(wrappedFunc);
            assert.equal(wrappedFunc.length, asyncErrorHandlingFunc.length);
        });
    });

    describe('wrapAll()', () => {
        it('should return the array of wrapped functions', () => {
            const funcs = [normalFunc, asyncFunc];
            const wrappedFuncs = utilities.wrapAll(funcs);
            validateNormalFunc(wrappedFuncs[0]);
            validateNormalFunc(wrappedFuncs[1]);
        });
    });
});
