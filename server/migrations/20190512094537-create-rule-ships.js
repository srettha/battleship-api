module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('rule_ships', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
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
        shipId: {
            allowNull: false,
            field: 'ship_id',
            type: Sequelize.INTEGER,
            references: {
                model: 'ships',
                key: 'id',
            },
        },
        number: {
            allowNull: false,
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
    down: queryInterface => queryInterface.dropTable('rule_ships'),
};
