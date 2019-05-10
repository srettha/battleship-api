const _ = require('lodash');

/**
 * @param {object} model model
 * @param {object} props model properties
 * @param {object} options sequelize options
 * @param {number} i number of model
 */
module.exports = (model, props = {}, options = {}, i = 1) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const modelProps = require(`./models/${_.toLower(model.tableName)}`);

    const mergedProps = _.map(Array(i), () => modelProps(props));

    const models = model.build(mergedProps, options);

    return models;
};
