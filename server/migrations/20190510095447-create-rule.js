module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('rules', {
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
    down: queryInterface => queryInterface.dropTable('rules'),
};
