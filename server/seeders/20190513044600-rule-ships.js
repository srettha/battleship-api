module.exports = {
    up: queryInterface => queryInterface.bulkInsert('rule_ships', [
        {
            rule_id: 1,
            ship_id: 1,
            number: 1,
        },
        {
            rule_id: 1,
            ship_id: 2,
            number: 2,
        },
        {
            rule_id: 1,
            ship_id: 3,
            number: 3,
        },
        {
            rule_id: 1,
            ship_id: 4,
            number: 4,
        },
    ], {}),
    down: queryInterface => queryInterface.bulkDelete('rule_ships', null, {}),
};
