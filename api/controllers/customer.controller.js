const customersService = require('../services/customers.service');

const service = new customersService();

const findAll = async (req, res, next) => {
  try {
    const limit = req.query?.size || 10;
    const customers = await service.getAll(limit);
    res.json(customers);
  } catch (error) {
    next(error);
  }
};
const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const costumerId = await service.getOne(id);
    res.json(costumerId);
  } catch (error) {
    next(error);
  }
};
const save = async (req, res, next) => {
  try {
    const body = req.body;
    const newCustomer = await service.create(body);
    res.status(201).json({
      message: 'customer Created',
      data: { newCustomer },
    });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const costumerId = await service.getOne(id);
    if(costumerId?.statusCode===404){
      throw boom.notFound('customer with id:' + id + ' not found');
    }
    const body = req.body;
    const costumerUpdated = await service.update(id, body);
    res.json({
      message: 'customer Updated',
      data: costumerUpdated,
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
    const costumerId = await service.getOne(id);
    if(!costumerId){
      throw boom.notFound('customer with id:' + id + ' not found');
    }
    const costumerPatch = await service.patch(id, body);
    res.json({
      message: 'customer Patch',
      data: costumerPatch,
      id,
    });
  } catch (error) {
    next(error);
  }
};
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const costumerId = await service.getOne(id);
    if(!costumerId){
      throw boom.notFound('customer with id:' + id + ' not found');
    }
    await service.delete(id);
    res.json({
      message: 'customer deleted',
      id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, findOne, save, update, patch, destroy };
