module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        status: {
            defaultValue: 'draft',
            type: DataTypes.ENUM('aborted', 'draft', 'in-progress', 'finished'),
        },
        ruleId: {
            allowNull: false,
            field: 'rule_id',
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
        tableName: 'games',
    });

    Game.associate = ({ Rule, Ship, Turn }) => {
        Game.belongsTo(Rule, { as: 'rule', foreignKey: 'ruleId', targetKey: 'id' });
        Game.belongsToMany(Ship, {
            as: 'ships',
            foreignKey: 'gameId',
            otherKey: 'shipId',
            through: 'GameInformations',
        });
        Game.hasMany(Turn, { as: 'turns', foreignKey: 'gameId', sourceKey: 'id' });
    };

    return Game;
};
