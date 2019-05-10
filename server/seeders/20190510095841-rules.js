module.exports = {
    up: queryInterface => queryInterface.bulkInsert('rules', [
        {
            coordinate_x: 10,
            coordinate_y: 10,
        },
    ], {}),
    down: queryInterface => queryInterface.bulkDelete('rules', null, {}),
};
