const { Model, DataTypes } = require('sequelize');
const CATEGORY_TABLE = 'categories';
const CategorySchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 15], // La longitud del nombre debe estar entre 3 y 15 caracteres
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true, // La URL de la imagen debe ser una URL válida
    },
  },
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
class Category extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
    };
  }
}
module.exports = { CATEGORY_TABLE, CategorySchema, Category };
