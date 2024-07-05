'use strict';
const { UserSchema, USER_TABLE } = require('../../user/user.model');
const { ProductSchema, PRODUCT_TABLE } = require('../../product/product.model');
const { CategorySchema, CATEGORY_TABLE } = require('../../category/category.model');
const { CustomerSchema, CUSTOMER_TABLE } = require('../../customer/customer.model');
// * Comando para crear la migración
// npm run migrations:generate create-tables
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);

  },
};
