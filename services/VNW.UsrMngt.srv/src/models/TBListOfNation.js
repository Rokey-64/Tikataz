const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TBListOfNation', {
    nation_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nation_code: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    nation_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TBListOfNation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nation_id" },
        ]
      },
    ]
  });
};
