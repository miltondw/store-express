'use strict';

const { CATEGORY_TABLE } = require('../models/category.model');
const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Asegúrate de que la columna category_id exista antes de agregar la referencia

    // Luego agrega la clave foránea
    await queryInterface.addConstraint(PRODUCT_TABLE, {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'products_category_id_fk', // nombre opcional de la constraint
      references: {
        table: CATEGORY_TABLE,
        field: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
    });
  },

  async down(queryInterface) {
    // Primero elimina la clave foránea
    await queryInterface.removeConstraint(PRODUCT_TABLE, 'products_category_id_fk');

    // Luego elimina la columna
  },
};