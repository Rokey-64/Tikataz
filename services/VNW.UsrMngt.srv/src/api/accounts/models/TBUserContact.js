import Sequelize, {DataTypes} from 'sequelize';

export default function(sequelize) {
  return sequelize.define('TBUserContact', {
    contact_id: {
      type: DataTypes.CHAR(21),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.CHAR(21),
      allowNull: false
    },
    nation_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contact_type: {
      type: DataTypes.ENUM('email','phone'),
      allowNull: false
    },
    contact_value: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    isUse: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'TBUserContact',
    timestamps: false,
  });
};
