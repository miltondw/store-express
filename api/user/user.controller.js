const usersService = require('./user.service');

const service = new usersService();

const findAll = async (req, res, next) => {
  try {
    const limit = req.query?.size || 10;
    const users = await service.getAll(limit);
    res.json(users);
  } catch (error) {
    next(error);
  }
};
const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = await service.getOne(id);
    res.json(userId);
  } catch (error) {
    next(error);
  }
};
const save = async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json({
      message: 'User Created',
      data: { newUser },
    });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = await service.getOne(id);
    if(userId?.statusCode===404){
      throw boom.notFound('user with id:' + id + ' not found');
    }
    const body = req.body;
    const userUpdated = await service.update(id, body);
    res.json({
      message: 'User Updated',
      data: userUpdated,
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
    const userId = await service.getOne(id);
    if(!userId){
      throw boom.notFound('user with id:' + id + ' not found');
    }
    const userPatch = await service.patch(id, body);
    res.json({
      message: 'User Patch',
      data: userPatch,
      id,
    });
  } catch (error) {
    next(error);
  }
};
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = await service.getOne(id);
    if(!userId){
      throw boom.notFound('user with id:' + id + ' not found');
    }
    await service.delete(id);
    res.json({
      message: 'User deleted',
      id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, findOne, save, update, patch, destroy };
