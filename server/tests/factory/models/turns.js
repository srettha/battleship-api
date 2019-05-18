// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const _ = require('lodash');

module.exports = (props) => {
    const defaultProps = {
        id: faker.random.number(100),
        coordinateX: faker.random.number(10),
        coordinateY: faker.random.number(10),
        status: faker.random.arrayElement(['hit', 'miss']),
        gameId: faker.random.number(10),
    };

    return _.merge({}, defaultProps, props);
};
