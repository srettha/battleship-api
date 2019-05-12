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
    }, {
        paranoid: true,
        tableName: 'rules',
        underscore: true,
    });

    Rule.associate = ({ Game }) => {
        Rule.hasMany(Game, { foreignKey: 'rule_id' });
    };

    return Rule;
};
