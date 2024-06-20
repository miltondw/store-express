const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class UsersService {
  constructor() {}
  async getAll(limit) {
    const users = await models.User.findAll({ limit,include:['customer'] });
    if (users.length === 0) {
      throw boom.notFound('There are no users');
    }
    users.unshift({ total: users.length });
    return users;
  }

  async getOne(id) {
    const productoId = await models.User.findByPk(id);
    if (!productoId) {
      throw boom.notFound('product with id:' + id + ' not found');
    }
    return productoId;
  }

  async create(data) {
    return await models.User.create(data);
  }

  async update(id, data) {
    await models.User.update(data, { where: { id } });
  }

  async patch(id, data) {
    await models.User.update(data, { where: { id } });
  }

  async delete(id) {
    return await models.User.destroy({
      where: {
        id,
      },
    });
  }
}
module.exports = UsersService;
