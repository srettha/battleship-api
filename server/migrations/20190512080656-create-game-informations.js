module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('game_ships', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        coordinateX: {
            allowNull: false,
            field: 'coordinate_x',
            type: Sequelize.INTEGER,
        },
        coordinateY: {
            allowNull: false,
            field: 'coordinate_y',
            type: Sequelize.INTEGER,
        },
        endCoordinateX: {
            allowNull: false,
            field: 'end_coordinate_x',
            type: Sequelize.INTEGER,
        },
        endCoordinateY: {
            allowNull: false,
            field: 'end_coordinate_y',
            type: Sequelize.INTEGER,
        },
        isHorizontal: {
            defaultValue: false,
            field: 'is_horizontal',
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
            unique: false,
        },
        gameId: {
            allowNull: false,
            field: 'game_id',
            type: Sequelize.INTEGER,
            references: {
                model: 'games',
                key: 'id',
            },
            unique: false,
        },
        baseHealth: {
            defaultValue: 0,
            field: 'base_health',
            type: Sequelize.INTEGER,
        },
        health: {
            defaultValue: 0,
            type: Sequelize.INTEGER,
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
