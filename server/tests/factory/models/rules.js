// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const _ = require('lodash');

module.exports = (props) => {
    const defaultProps = {
        id: faker.random.number(100),
        coordinateX: faker.random.arrayElement([10, 15, 20, 25, 30]),
        coordinateY: faker.random.arrayElement([10, 15, 20, 25, 30]),
        ships: [],
    };

    return _.merge({}, defaultProps, props);
};
