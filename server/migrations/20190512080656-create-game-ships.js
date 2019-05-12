module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('game_ships', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        coordinate: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        isHorizontal: {
            defaultValue: false,
            type: Sequelize.BOOLEAN,
        },
        shipId: {
            allowNull: false,
            field: 'ship_id',
            type: Sequelize.INTEGER,
            references: {
                model: 'ships',
                key: 'id',
            },
        },
        health: {
            type: Sequelize.INTEGER,
        },
        gameId: {
            allowNull: false,
            field: 'game_id',
            type: Sequelize.INTEGER,
            references: {
                model: 'games',
                key: 'id',
            },
        },
        createdAt: {
            allowNull: false,
            defaultValue: queryInterface.sequelize.fn('NOW'),
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            defaultValue: queryInterface.sequelize.fn('NOW'),
            field: 'updated_at',
            type: Sequelize.DATE,
        },
        deletedAt: {
            field: 'deleted_at',
            type: Sequelize.DATE,
        },
    }),
    down: queryInterface => queryInterface.dropTable('game_ships'),
};
