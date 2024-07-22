const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../../libs/sequelize');
class UsersService {
  constructor() {}
  async getAll(limit) {
    const users = await models.User.findAll({ limit,include:['customer'] });
    if (!!users.length === 0) {
      throw boom.notFound('There are no users');
    }
    users.unshift({ total: users.length });
    return users;
  }

  async getOne(id) {
    const userId = await models.User.findByPk(id);
    if (!userId) {
      throw boom.notFound('User with id:' + id + ' not found');
    }
    return userId;
  }

  async getByEmail(email) {
    const userEmail = await models.User.findOne({where:{email}});
    if (!userEmail) {
      throw boom.notFound('User with email:' + email + ' not found');
    }
    return userEmail;
  }

  async create(data) {
       const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
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
