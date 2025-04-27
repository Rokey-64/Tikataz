import Sequelize, { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('TBProfile', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        /** company name */
        corp_name: {
            type: DataTypes.STRING(300),
            allowNull: false
        },

        tax_code: {
            type: DataTypes.STRING(32),
            allowNull: false
        },

        /**Is the time that company was permitted to engage in activity by goverment*/
        register_date: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(8),
            allowNull: false
        },

        bussiness_field: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        vision: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        mission: {
            type: DataTypes.STRING(300),
            allowNull: true
        },

        fax: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        nation_id: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        phone_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        logo_index: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING(21),
            allowNull: false
        },
    }, {
        tableName: 'TBProfile',
        timestamps: false
    });
};
