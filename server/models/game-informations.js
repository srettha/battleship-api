module.exports = (sequelize, DataTypes) => {
    const GameInformations = sequelize.define('GameInformations', {
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
        endCoordinateX: {
            allowNull: false,
            field: 'end_coordinate_x',
            type: DataTypes.NUMBER,
        },
        endCoordinateY: {
            allowNull: false,
            field: 'end_coordinate_y',
            type: DataTypes.NUMBER,
        },
        isHorizontal: {
            defaultValue: false,
            field: 'is_horizontal',
            type: DataTypes.BOOLEAN,
        },
        gameId: {
            allowNull: false,
            field: 'game_id',
            type: DataTypes.INTEGER,
            unique: false,
        },
        shipId: {
            allowNull: false,
            field: 'ship_id',
            type: DataTypes.INTEGER,
            unique: false,
        },
        baseHealth: {
            defaultValue: 0,
            field: 'base_health',
            type: DataTypes.INTEGER,
        },
        health: {
            defaultValue: 0,
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
        tableName: 'game_ships',
    });

    return GameInformations;
};
