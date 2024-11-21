const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TBUserPassword', {
    pass_id: {
      type: DataTypes.CHAR(21),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.CHAR(21),
      allowNull: false
    },
    hash_password: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'TBUserPassword',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pass_id" },
        ]
      },
      {
        name: "pass_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pass_id" },
        ]
      },
      {
        name: "IDX_User",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
