const ProductsService = require('./product.service');

const service = new ProductsService();

const findAll = async (req, res, next) => {
  try {
    const products = await service.getAll(req.query);
    res.json(products); 
  } catch (error) {
    next(error);
  }
};
const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productoId = await service.getOne(id);
    res.json(productoId);
  } catch (error) {
    next(error);
  }
};
const save = async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'Product Created',
      data: { newProduct },
    });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productoId = await service.getOne(id);
    if (!productoId) {
      throw boom.notFound('product with id:' + id + ' not found');
    }
    const body = req.body;
    const productUpdated = await service.update(id, body);
    res.json({
      message: 'Product Updated',
      data: productUpdated,
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
    const productoId = await service.getOne(id);
    if (!productoId) {
      throw boom.notFound('product with id:' + id + ' not found');
    }
    const productPatch = await service.patch(id, body);
    res.json({
      message: 'Product Patch',
      data: productPatch,
      id,
    });
  } catch (error) {
    next(error);
  }
};
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productoId = await service.getOne(id);
    if (!productoId) {
      throw boom.notFound('product with id:' + id + ' not found');
    }
    await service.delete(id);
    res.json({
      message: 'Product deleted',
      id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, findOne, save, update, patch, destroy };
