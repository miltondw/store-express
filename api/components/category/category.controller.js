const CategoriesService = require('./category.service');

const service = new CategoriesService();

const findAll = async (req, res, next) => {
  try {
    const limit = req.query?.size || 10;
    const categories = await service.getAll(limit);
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryId = await service.getOne(id);
    res.json(categoryId);
  } catch (error) {
    next(error);
  }
};
const save = async (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json({
      message: 'Category Created',
      data: { newCategory },
    });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryId = await service.getOne(id);
    if (!categoryId) {
      throw boom.notFound('category with id:' + id + ' not found');
    }
    const body = req.body;
    const categoryUpdated = await service.update(id, body);
    res.json({
      message: 'Category Updated',
      data: categoryUpdated,
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
    const categoryId = await service.getOne(id);
    if (!categoryId) {
      throw boom.notFound('category with id:' + id + ' not found');
    }
    const categoryPatch = await service.patch(id, body);
    res.json({
      message: 'Category Patch',
      data: categoryPatch,
      id,
    });
  } catch (error) {
    next(error);
  }
};
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryId = await service.getOne(id);
    if (!categoryId) {
      throw boom.notFound('category with id:' + id + ' not found');
    }
    await service.delete(id);
    res.json({
      message: 'Category deleted',
      id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, findOne, save, update, patch, destroy };
