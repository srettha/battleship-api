module.exports = (sequelize, DataTypes) => {
    const RuleShips = sequelize.define('RuleShips', {
        ruleId: {
            allowNull: false,
            field: 'rule_id',
            type: DataTypes.INTEGER,
        },
        shipId: {
            allowNull: false,
            field: 'ship_id',
            type: DataTypes.INTEGER,
        },
        number: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        createdAt: {
            allowNull: false,
            defaultValue: sequelize.fn('NOW'),
            field: 'created_at',
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            defaultValue: sequelize.fn('NOW'),
            field: 'updated_at',
            type: DataTypes.DATE,
        },
        deletedAt: {
            field: 'deleted_at',
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'rule_ships',
    });

    return RuleShips;
};
