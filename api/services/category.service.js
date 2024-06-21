const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class CategoriesService {
  constructor() {}
  async getAll(limit) {
    const categories = await models.Category.findAll({ limit });
    if (categories.length === 0) {
      throw boom.notFound('There are no categories');
    }
    categories.unshift({ total: categories.length });
    return categories;
  }

  async getOne(id) {
    const categoryId = await models.Category.findByPk(id,{include:['products']});
    if (!categoryId) {
      throw boom.notFound('category with id:' + id + ' not found');
    }
    return categoryId;
  }

  async create(data) {
    return await models.Category.create(data);
  }

  async update(id, data) {
    await models.Category.update(data, { where: { id } });
  }

  async patch(id, data) {
    await models.Category.update(data, { where: { id } });
  }

  async delete(id) {
    return await models.Category.destroy({
      where: {
        id,
      },
    });
  }
}
module.exports = CategoriesService;
