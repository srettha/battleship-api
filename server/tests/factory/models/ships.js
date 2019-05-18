// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const _ = require('lodash');

module.exports = (props) => {
    const defaultProps = {
        id: faker.random.number(100),
        name: faker.name.findName(),
        life: faker.random.number(10),
    };

    return _.merge({}, defaultProps, props);
};
