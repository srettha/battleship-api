const faker = require('faker');
const _ = require('lodash');

module.exports = (props) => {
    const defaultProps = {
        id: faker.random.number(100),
        ruleId: faker.random.number(10),
        shipId: faker.random.number(10),
        number: faker.random.number(10),
    };

    _.merge({}, defaultProps, props);
};
