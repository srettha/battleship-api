module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('turns', {
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
        status: {
            allowNull: false,
            defaultValue: 'miss',
            type: Sequelize.ENUM('hit', 'miss'),
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
    down: queryInterface => queryInterface.dropTable('turns'),
};
