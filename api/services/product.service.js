const PRODUCTS = require('../MOCK/PRODUCTS.json');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres');
class ProductsService {
  constructor() {
    this.products = PRODUCTS;
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }
  async getAll(limit) {
    const query = `SELECT * FROM products limit ${limit} `;
    const rta = await this.pool.query(query);
    // const products = PRODUCTS.slice(0, limit);
    const products = rta.rows||[];
    products.unshift({ total: products.length });
    if (products.length === 0) {
      throw boom.notFound('There are no products');
    }
    return products;
  }

  async getOne(id) {
    const productoId = PRODUCTS.find((productoId) => productoId.id == id);
    if (!productoId) {
      throw boom.notFound('product with id:' + id + ' not found');
    }
    return productoId;
  }

  async create(data) {
    const newProduct = {
      ...data,
      id: this.products.length + 1,
    };
    if (Object.values(data).length === 0) this.products.push(newProduct);
    return newProduct;
  }

  async update(id, data) {
    const product = await this.getOne(id);
    if (product) {
      this.products[Number(id) - 1] = {
        ...data,
        id: id,
      };
    }
    return product;
  }

  async patch(id, data) {
    const product = await this.getOne(id);

    if (product) {
      this.products[Number(id) - 1] = {
        ...product,
        ...data,
        id: id,
      };
    }
    return product;
  }

  async delete(id) {
    return this.products.splice(Number(id) - 1, 1);
  }
}
module.exports = ProductsService;
