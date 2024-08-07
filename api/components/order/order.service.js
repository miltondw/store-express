const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
class OrdersService {
  constructor() { }
  async getAll(limit) {
    const orders = await models.Order.findAll({ limit });
    if (!!orders.length === 0) {
      throw boom.notFound('There are no orders');
    }
    orders.unshift({ total: orders.length });
    return orders;
  }

  async getOne(id) {
    const orderId = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        {
          association: 'items',
          include: ['category'],
        },
      ],
    });
    if (!orderId) {
      throw boom.notFound('order with id:' + id + ' not found');
    }
    return orderId;
  }

  async getByUser(userId) {
    const orders = await models.Order.findAll({
      where:{
        '$customer.user.id$':userId
      },include:[
        {
          association:'customer',
          include:['user']
        }
      ]
    });
    if (!orders) {
      throw boom.notFound('order with id:' + id + ' not found');
    }
    return orders;
  }

  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    })
    if (!customer) {
      throw boom.badRequest('Customer not found');
    }
    return await models.Order.create({ customerId: customer.id });
  }
    
  async addItem(data) {
    const productId= await models.Product.findByPk(data.productId)
    if (!productId) {
      throw boom.notFound('order with product id:' + id + ' not found');
    }
    return await models.OrderProduct.create(data);
  }

  async update(id, data) {
    await models.Order.update(data, { where: { id } });
  }

  async patch(id, data) {
    await models.Order.update(data, { where: { id } });
  }

  async delete(id) {
    return await models.Order.destroy({
      where: {
        id,
      },
    });
  }
}
module.exports = OrdersService;
