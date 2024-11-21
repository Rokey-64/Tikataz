const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TBUserRole', {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.CHAR(21),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'TBUserRole',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "role_id" },
          { name: "user_id" },
        ]
      },
      {
        name: "IDX_User",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "IDX_Role",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
};
