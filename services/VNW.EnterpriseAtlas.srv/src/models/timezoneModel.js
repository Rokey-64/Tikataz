import Sequelize, { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('TBTimezone', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        timezone: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        remark: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
    }, {
        tableName: 'TBTimezone', // Chỉ định tên bảng chính xác
        timestamps: false // Nếu bạn không sử dụng các cột timestamps
    });
};
