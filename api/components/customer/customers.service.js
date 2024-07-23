const boom = require('@hapi/boom');
const { models } = require('@api/libs/sequelize');
const bcrypt = require('bcrypt');
class CustomersService {
  constructor() {}
  async getAll(limit) {
    const customer = await models.Customer.findAll({ limit,include:['user'] });
    if (!!customer.length === 0) { 
      throw boom.notFound('There are no customer');
    }
    customer.unshift({ total: customer.length });
    return customer;
  }

  async getOne(id) {
    const customerId = await models.Customer.findByPk(id,{ include:['user'] });
    if (!customerId) {
      throw boom.notFound('Customer with id:' + id + ' not found');
    }
    return customerId;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(id, data) {
    await models.Customer.update(data, { where: { id } });
  }

  async patch(id, data) {
    await models.Customer.update(data, { where: { id } });
  }

  async delete(id) {
    return await models.Customer.destroy({
      where: {
        id,
      },
    });
  }
}
module.exports = CustomersService;
