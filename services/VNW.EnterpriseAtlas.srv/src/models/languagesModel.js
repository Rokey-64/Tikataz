import Sequelize, { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('TBListLanguages', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        language: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        isSupported: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    }, {
        tableName: 'TBListLanguages', // Chỉ định tên bảng chính xác
        timestamps: false // Nếu bạn không sử dụng các cột timestamps
    });
};
