module.exports = (sequelize, DataTypes) => {
    const ship = sequelize.define('Ship', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        life: {
            allowNull: false,
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
        tableName: 'ships',
        paranoid: true,
    });

    // ship.associate = models => {
    // };

    return ship;
};
