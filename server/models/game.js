module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        status: {
            defaultValue: 'draft',
            type: DataTypes.ENUM('draft', 'in-progress', 'finished'),
        },
        ruleId: {
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
        tableName: 'games',
        underscore: true,
    });

    Game.associate = ({ GameShips, Turn }) => {
        Game.hasMany(GameShips, { as: 'ships', foreignKey: 'game_id', sourceKey: 'id' });
        Game.hasMany(Turn, { as: 'turns', foreignKey: 'game_id', sourceKey: 'id' });
    };

    return Game;
};
