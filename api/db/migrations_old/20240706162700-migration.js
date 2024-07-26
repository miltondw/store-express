'use strict';

const { UserSchema, USER_TABLE } = require('../../components/user/user.model');
const { ProductSchema, PRODUCT_TABLE } = require('../../components/product/product.model');
const { CategorySchema, CATEGORY_TABLE } = require('../../components/category/category.model');
const { CustomerSchema, CUSTOMER_TABLE } = require('../../components/customer/customer.model');
const { OrderSchema, ORDER_TABLE } = require('../../components/order/order.model');
const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('../../components/order/order-product.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear todas las tablas
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);

    // Agregar las constraints de claves foráneas
    await queryInterface.addConstraint(PRODUCT_TABLE, {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'products_category_id_fk',
      references: {
        table: CATEGORY_TABLE,
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addConstraint(CUSTOMER_TABLE, {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'customers_user_id_fk',
      references: {
        table: USER_TABLE,
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addConstraint(ORDER_TABLE, {
      fields: ['customer_id'],
      type: 'foreign key',
      name: 'orders_customer_id_fk', 
      references: {
        table: CUSTOMER_TABLE,
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addConstraint(ORDER_PRODUCT_TABLE, {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'orders_products_order_id_fk', 
      references: {
        table: ORDER_TABLE,
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addConstraint(ORDER_PRODUCT_TABLE, {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'orders_products_product_id_fk',
      references: {
        table: PRODUCT_TABLE,
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar las constraints de claves foráneas
    await queryInterface.removeConstraint(PRODUCT_TABLE, 'products_category_id_fk');
    await queryInterface.removeConstraint(CUSTOMER_TABLE, 'customers_user_id_fk');
    await queryInterface.removeConstraint(ORDER_TABLE, 'orders_customer_id_fk');
    await queryInterface.removeConstraint(ORDER_PRODUCT_TABLE, 'orders_products_order_id_fk');
    await queryInterface.removeConstraint(ORDER_PRODUCT_TABLE, 'orders_products_product_id_fk');

    // Eliminar todas las tablas
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  },
};
