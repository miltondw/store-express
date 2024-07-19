const express = require('express');
const validatorHandler = require('./../../middlewares/validator.handler');
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} = require('./user.schema');
const {
  findAll,
  findOne,
  save,
  update,
  patch,
  destroy,
} = require('./user.controller');

const router = express.Router();

router.get('/', findAll);

router.get('/:id', validatorHandler(getUserSchema, 'params'), findOne);

router.post('/', validatorHandler(createUserSchema, 'body'), save);

router.put(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  update,
);
router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  patch,
);

router.delete('/:id', validatorHandler(getUserSchema, 'params'), destroy);

module.exports = router;
