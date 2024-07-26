'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('../../components/customer/customer.model');

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable(CUSTOMER_TABLE);

  },
};
