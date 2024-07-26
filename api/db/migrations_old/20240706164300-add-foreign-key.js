// 20240706170000-add-foreign-keys.js

'use strict';

const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');
const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'categories' si aún no existe
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);

    // Crear la tabla 'products' si aún no existe
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);

    // Añadir la clave foránea 'category_id' en 'products'
    await queryInterface.addConstraint(PRODUCT_TABLE, {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'products_category_id_fk',
      references: {
        table: CATEGORY_TABLE,
        field: 'id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la clave foránea 'category_id' en 'products'
    await queryInterface.removeConstraint(PRODUCT_TABLE, 'products_category_id_fk');

    // Eliminar la tabla 'products'
    await queryInterface.dropTable(PRODUCT_TABLE);

    // Eliminar la tabla 'categories'
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
