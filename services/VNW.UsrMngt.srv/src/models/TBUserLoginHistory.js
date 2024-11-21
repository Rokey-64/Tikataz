const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TBUserLoginHistory', {
    Login_id: {
      type: DataTypes.CHAR(21),
      allowNull: false,
      primaryKey: true
    },
    credencial_id: {
      type: DataTypes.CHAR(21),
      allowNull: false
    },
    iv6_address: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    iv4_address: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    os_edition: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    browser: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'TBUserLoginHistory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Login_id" },
        ]
      },
      {
        name: "Login_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Login_id" },
        ]
      },
      {
        name: "IDX_Credencial",
        using: "BTREE",
        fields: [
          { name: "credencial_id" },
        ]
      },
    ]
  });
};
