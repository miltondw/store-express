const boom = require('@hapi/boom');
// const sequelize = require('../libs/sequelize');
const {
  models
} = require('../libs/sequelize');
const { Op } = require('sequelize');
class ProductsService {
  constructor() {}
  async getAll(query) {
    /* const query = `SELECT * FROM products limit ${limit} `;
    * Get con el método client de pg
    const rta = await this.pool.query(query); 
    * Get con datos quemados de MOCK
    const products = PRODUCTS.slice(0, limit);
    * Get con sequelize query
    const [data] = await sequelize.query(query); */
    const options = {
      include: ['category'],
      where: {},
    };
    Object.entries(query).forEach(([key, value]) => {
      query[key] = Number(value);
    });
    const {
      limit,
      offset,
      price,
      price_min,
      price_max
    } = query;
    const pageSize = limit;
    const page = offset * pageSize;
    if (limit && offset) {
      options.limit = pageSize;
      options.offset = page;
    }
    if (price) {
      options.where.price = {
        [Op.between]: [price_min, price_max],
      };
    }
    const products = await models.Product.findAll(options);
    if (!!products.length === 0) {
      throw boom.notFound('There are no products');
    }
    products.unshift({
      total: products.length
    });
    return products;
  }

  async getOne(id) {
    const productoId = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!productoId) {
      throw boom.notFound('product with id:' + id + ' not found');
    }
    return productoId;
  }

  async create(data) {
    return await models.Product.create(data);
  }

  async update(id, data) {
    await models.Product.update(data, {
      where: {
        id
      }
    });
  }

  async patch(id, data) {
    await models.Product.update(data, {
      where: {
        id
      }
    });
  }

  async delete(id) {
    return await models.Product.destroy({
      where: {
        id,
      },
    });
  }
}
module.exports = ProductsService;
