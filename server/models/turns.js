module.exports = (sequelize, DataTypes) => {
    const Turn = sequelize.define('Turn', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
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
        status: {
            allowNull: false,
            defaultValue: 'miss',
            type: DataTypes.ENUM('hit', 'miss'),
        },
        gameId: {
            allowNull: false,
            field: 'game_id',
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
        tableName: 'turns',
    });
    Turn.associate = ({ Game }) => {
        Turn.belongsTo(Game, { as: 'games', foreignKey: 'gameId', targetKey: 'id' });
    };
    return Turn;
};
