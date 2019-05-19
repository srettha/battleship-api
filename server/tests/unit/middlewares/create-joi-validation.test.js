const chai = require('chai');
const HttpStatus = require('http-status');
const Joi = require('joi');
const HttpMocks = require('node-mocks-http');
const sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: '' });
const { assert } = chai;

const { createJoiValidation } = require('../../../middlewares');

module.exports = () => {
    describe('createJoiValidation()', () => {
        let sandbox;

        let res;

        beforeEach(() => {
            sandbox = sinon.createSandbox();

            res = HttpMocks.createResponse();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should skip validation if no schama is provided', () => {
            const schema = {};
            const req = HttpMocks.createRequest();

            const validation = createJoiValidation(schema, {});
            validation(req, res, (err) => {
                assert.isUndefined(err);
            });
        });

        it('should skip validation if provided schema doesn\'t have expected field names ', () => {
            const schema = { query: { date: Joi.string().required() } };
            const req = HttpMocks.createRequest();
            const validation = createJoiValidation(schema, {});

            validation(req, res, (err) => {
                assert.isUndefined(err);
            });
        });

        it('should return error if the body validation fails', () => {
            const schema = {
                body: {
                    name: Joi.string().required(),
                },
            };
            const req = HttpMocks.createRequest({
                body: {
                    name: '',
                },
            });
            const validation = createJoiValidation(schema);

            validation(req, res, (err) => {
                assert.equal(err.name, 'BattleshipValidationError');
                assert.equal(err.statusCode, HttpStatus.BAD_REQUEST);
            });
        });

        it('should return no error if the body validation passes', () => {
            const schema = {
                body: {
                    name: Joi.string().required(),
                },
            };
            const req = HttpMocks.createRequest({
                body: {
                    name: 'name',
                },
            });
            const validation = createJoiValidation(schema);

            validation(req, res, (err) => {
                assert.isUndefined(err);
            });
        });
    });
};
