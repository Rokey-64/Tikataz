import Sequelize, { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('TBListNation', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nation_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        code: {
            type: DataTypes.STRING(3),
            allowNull: true
        },
        lang_id: {
            type: DataTypes.TINYINT,
            allowNull: true
        },
    }, {
        tableName: 'TBListNation', // Chỉ định tên bảng chính xác
        timestamps: false // Nếu bạn không sử dụng các cột timestamps
    });
};
