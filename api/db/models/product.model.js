const { Model, DataTypes } = require('sequelize');
const PRODUCT_TABLE = 'products';
const ProductSchema = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 30],
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 250],
    },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  availability:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:true
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

class Product extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
    };
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
