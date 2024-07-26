'use strict';
const { ProductSchema, PRODUCT_TABLE } = require('../../components/product/product.model');
const { CategorySchema, CATEGORY_TABLE } = require('../../components/category/category.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
