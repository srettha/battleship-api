module.exports = (sequelize, DataTypes) => {
    const GameShips = sequelize.define('GameShips', {
        coordinate: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        isHorizontal: {
            defaultValue: false,
            type: DataTypes.BOOLEAN,
        },
        shipId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        health: {
            type: DataTypes.INTEGER,
        },
        gameId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        createdAt: {
            allowNull: false,
            defaultValue: sequelize.fn('NOW'),
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            defaultValue: sequelize.fn('NOW'),
            type: DataTypes.DATE,
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        tableName: 'game_ships',
        underscore: true,
    });

    GameShips.associate = ({ Game, Ship }) => {
        GameShips.belongsTo(Ship, { as: 'ships', foreignKey: 'ship_id', targetKey: 'id' });
        GameShips.belongsTo(Game, { as: 'games', foreignKey: 'game_id', targetKey: 'id' });
    };

    return GameShips;
};
