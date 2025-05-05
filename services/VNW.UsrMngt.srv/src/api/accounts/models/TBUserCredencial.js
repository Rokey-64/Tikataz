const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TBUserCredencial', {
    credencial_id: {
      type: DataTypes.CHAR(21),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.CHAR(21),
      allowNull: false
    },
    token_value: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TBUserCredencial',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "credencial_id" },
        ]
      },
      {
        name: "credencial_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "credencial_id" },
        ]
      },
      {
        name: "IDX_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
