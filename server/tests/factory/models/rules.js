// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const _ = require('lodash');

module.exports = (props) => {
    const defaultProps = {
        coordinateX: faker.random.arrayElement([10, 15, 20, 25, 30]),
        coordinateY: faker.random.arrayElement([10, 15, 20, 25, 30]),
    };

    return _.merge({}, defaultProps, props);
};
