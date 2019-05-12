module.exports = (sequelize, DataTypes) => {
    const Turns = sequelize.define('Turns', {
        coordinate: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        status: {
            allowNull: false,
            defaultValue: 'miss',
            type: DataTypes.ENUM('hit', 'miss'),
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
        tableName: 'turns',
        underscore: true,
    });
    Turns.associate = ({ Game }) => {
        Turns.belongsTo(Game, { as: 'games', foreignKey: 'game_id', targetKey: 'id' });
    };
    return Turns;
};
