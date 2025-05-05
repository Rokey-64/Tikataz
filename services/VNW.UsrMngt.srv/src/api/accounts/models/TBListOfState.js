//const Sequelize = require('sequelize');
export const state = function(sequelize, DataTypes) {
  return sequelize.define('TBListOfState', {
    state_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    state_description: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TBListOfState',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "state_id" },
        ]
      },
    ]
  });
};
