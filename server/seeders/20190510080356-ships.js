module.exports = {
    up: queryInterface => queryInterface.bulkInsert('ships', [
        {
            name: 'Battleship',
            life: 4,
        },
        {
            name: 'Cruiser',
            life: 3,
        },
        {
            name: 'Destroyer',
            life: 2,
        },
        {
            name: 'Submarine',
            life: 1,
        },
    ], {}),
    down: queryInterface => queryInterface.bulkDelete('ships', null, {}),
};
