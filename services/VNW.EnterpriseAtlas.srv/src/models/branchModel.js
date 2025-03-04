import Sequelize, { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('TBListBranches', {
        id: {
            autoIncrement: true,
            type: DataTypes.STRING(21),
            allowNull: false,
            primaryKey: true
        },

        /** branch name */
        name: {
            type: DataTypes.STRING(300),
            allowNull: false
        },

        tax_code: {
            type: DataTypes.STRING(32),
            allowNull: true
        },

        /**Is the time that company was permitted to engage in activity by goverment*/
        register_date: {
            type: DataTypes.STRING(32),
            allowNull: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        address: {
            type: DataTypes.STRING(8),
            allowNull: false
        }
    }, {
        tableName: 'TBListBranches',
        timestamps: false
    });
};
