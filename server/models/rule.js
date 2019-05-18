module.exports = (sequelize, DataTypes) => {
    const Rule = sequelize.define('Rule', {
        coordinateX: {
            allowNull: false,
            field: 'coordinate_x',
            type: DataTypes.NUMBER,
        },
        coordinateY: {
            allowNull: false,
            field: 'coordinate_y',
            type: DataTypes.NUMBER,
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
        tableName: 'rules',
    });

    Rule.associate = ({ Game, Ship }) => {
        Rule.hasMany(Game, { as: 'games', foreignKey: 'ruleId', sourceKey: 'id' });
        Rule.belongsToMany(Ship, {
            as: 'ships',
            foreignKey: 'ruleId',
            otherKey: 'shipId',
            through: 'RuleShips',
        });
    };

    return Rule;
};
