module.exports = (sequelize, DataTypes) => {
    const Ship = sequelize.define('Ship', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
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
        paranoid: true,
        tableName: 'ships',
    });

    Ship.associate = ({ Game, Rule }) => {
        Ship.belongsToMany(Game, {
            as: 'games',
            foreignKey: 'shipId',
            otherKey: 'gameId',
            through: 'GameInformations',
        });
        Ship.belongsToMany(Rule, {
            as: 'rules',
            foreignKey: 'shipId',
            otherKey: 'ruleId',
            through: 'RuleShips',
        });
    };

    return Ship;
};
