const OrdersService = require('./order.service');

const service = new OrdersService();

const findAll = async (req, res, next) => {
  try {
    const limit = req.query?.size || 10;
    const orders = await service.getAll(limit);
    if (!!Object.keys(orders).length === 0) {
      res.status(404).json({
        message: 'no hay ordenes',
        data: { orders },
      });
    } else {
      res.json(orders);
    }


    if(!!orders.Object?.entries.length === 0){
      res.status(404).json({
        message: 'no hay ordenes',
        data: { newOrder },
      });
    }else{

      res.json(orders);
    }
  } catch (error) {
    next(error);
  }
};
const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderId = await service.getOne(id);
    res.json(orderId);
  } catch (error) {
    next(error);
  }
};
const save = async (req, res, next) => {
  try {
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json({
      message: 'Order Created',
      data: { newOrder },
    });
  } catch (error) {
    next(error);
  }
};
const addItem = async (req, res, next) => {
  try {
    const body = req.body;
    const newItem = await service.addItem(body);
    res.status(201).json({
      message: 'Item Created',
      data: { newItem },
    });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderId = await service.getOne(id);
    if (!orderId) {
      throw boom.notFound('order with id:' + id + ' not found');
    }
    const body = req.body;
    const orderUpdated = await service.update(id, body);
    res.json({
      message: 'Order Updated',
      data: orderUpdated,
      id,
    });
  } catch (error) {
    next(error);
  }
};
const patch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const orderId = await service.getOne(id);
    if (!orderId) {
      throw boom.notFound('order with id:' + id + ' not found');
    }
    const orderPatch = await service.patch(id, body);
    res.json({
      message: 'Order Patch',
      data: orderPatch,
      id,
    });
  } catch (error) {
    next(error);
  }
};
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderId = await service.getOne(id);
    if (!orderId) {
      throw boom.notFound('order with id:' + id + ' not found');
    }
    await service.delete(id);
    res.json({
      message: 'Order deleted',
      id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, findOne, save,addItem, update, patch, destroy };
