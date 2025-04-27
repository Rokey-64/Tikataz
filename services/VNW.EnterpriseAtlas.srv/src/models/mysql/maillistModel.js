import Sequelize, { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('TBListNation', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
    }, {
        tableName: 'TBListNation',
        timestamps: false
    });
};
