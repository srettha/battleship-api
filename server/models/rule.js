module.exports = (sequelize, DataTypes) => {
    const rule = sequelize.define('Rule', {
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
    }, {});

    // rule.associate = function (models) {
    // };

    return rule;
};
