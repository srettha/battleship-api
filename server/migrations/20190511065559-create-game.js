module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('games', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        status: {
            defaultValue: 'draft',
            type: Sequelize.ENUM('draft', 'in-progress', 'finished'),
        },
        ruleId: {
            allowNull: false,
            field: 'rule_id',
            type: Sequelize.INTEGER,
            references: {
                model: 'rules',
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
    down: queryInterface => queryInterface.dropTable('games'),
};
