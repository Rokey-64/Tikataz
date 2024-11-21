import Sequelize, { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('TBUserHistoryChangedPassword', {
        hpw_id: {
            type: DataTypes.CHAR(21),
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.CHAR(21),
            allowNull: false
        },
        hash_password: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.Sequelize.fn('now')
        }
    },
        {
            sequelize,
            tableName: 'TBUserHistoryChangedPassword',
            freetableName: true,
            timestamps: false,
        }
    )
};
