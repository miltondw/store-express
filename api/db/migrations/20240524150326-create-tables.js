'use strict';
const { CategorySchema, CATEGORY_TABLE } = require('./../../components/category/category.model');
const { ProductSchema, PRODUCT_TABLE } = require('./../../components/product/product.model');
const { CustomerSchema, CUSTOMER_TABLE } = require('./../../components/customer/customer.model');
const { OrderSchema, ORDER_TABLE } = require('../../components/order/order.model'); 
const { OrderProductSchema,ORDER_PRODUCT_TABLE } = require('../../components/order/order-product.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  },
};
