const { Model, DataTypes } = require('sequelize');
const USER_TABLE = 'users';
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: { allowNull: false, type: DataTypes.STRING, unique: true },
  password: { allowNull: false, type: DataTypes.STRING },
  role: { allowNull: false, type: DataTypes.STRING },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: DataTypes.NOW,
  },
};
class User extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
    };
  }
}
module.exports = { USER_TABLE, UserSchema, User };
