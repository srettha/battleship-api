const Joi = require('joi');
const _ = require('lodash');

const { BattleshipValidationError } = require('../errors');

const expectedRequestFieldNames = [
    'body',
];

/**
 * Format joi error message detail
 * @param {Object} errDetail
 * @returns {String}
 */
const formatJoiErrorMessageDetail = (errDetail) => {
    if (_.isEmpty(errDetail) || !errDetail.message || !errDetail.path) {
        return 'Request parameter is invalid';
    }

    const message = errDetail.message.replace(/"[\w\d]+"/, `${errDetail.path.join('.')}`);
    return message;
};

/**
 * Joi validation to validate incoming input based on
 * expected request field names
 * @param {Object} schema
 * @param {Object} [options]
 * @param {Boolean} [options.abortEarly]
 * @param {Boolean} [options.allowUnknown]
 */
module.exports = (schema, options = { abortEarly: false, allowUnknown: true }) => {
    const fieldNamesToBeValidated = _.chain(schema)
        .keys()
        .filter(k => _.includes(expectedRequestFieldNames, k))
        .value();

    const compiledSchema = Joi.compile(schema);

    return (req, _res, next) => {
        const propertiesToBeValidated = _.pick(req, fieldNamesToBeValidated);
        Joi.validate(propertiesToBeValidated, compiledSchema, options, (err, schemaResult) => {
            if (err) {
                const meta = {};
                const messageDetails = err.details.map((detail) => {
                    const message = formatJoiErrorMessageDetail(detail);
                    detail.path.forEach((p) => {
                        if (_.has(propertiesToBeValidated, p)) {
                            meta[p] = _.get(propertiesToBeValidated, p);
                        }
                    });

                    return message;
                });

                const validationErrorMessage = `Validation error: ${messageDetails.join(', ')}`;
                return next(new BattleshipValidationError(validationErrorMessage, meta));
            }

            req.schema = schemaResult;
            return next();
        });
    };
};
