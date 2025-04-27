import Sequelize, { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('TBPhoneCategory', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        phone_number: {
            type: DataTypes.STRING(13),
            allowNull: false
        },
        nation_code: {
            type: DataTypes.STRING(5),
            allowNull: false
        }
    }, {
        tableName: 'TBPhoneCategory',
        timestamps: false
    });
};
