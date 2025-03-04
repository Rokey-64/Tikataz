import Sequelize, { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('TBFeedbacks', {
        id: {
            autoIncrement: false,
            type: DataTypes.STRING(21),
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email_notify: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        state: {
            type: DataTypes.ENUM('await', 'finish', 'cancel'),
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING(21),
            allowNull: false
        },
    }, {
        tableName: 'TBFeedbacks',
        timestamps: false
    });
};
