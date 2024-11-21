import Sequelize, {DataTypes} from 'sequelize';

export default function (sequelize){
  return sequelize.define('TBUserAccount',{
    user_id: {
      type: DataTypes.CHAR(21),
      allowNull: false,
      primaryKey: true
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(64),
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
      tableName: 'TBUserAccount',
      freetableName: true,
      timestamps: false,
  }
)};
