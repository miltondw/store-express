const express = require('express');
const validatorHandler = require('./../../middlewares/validator.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('./category.schema');
const {
  findAll,
  findOne,
  save,
  update,
  patch,
  destroy,
} = require('./category.controller');
const router = express.Router();

router.get('/', findAll);

router.get('/:id', validatorHandler(getCategorySchema, 'params'), findOne);

router.post('/', validatorHandler(createCategorySchema, 'body'), save);

router.put(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  update,
);
router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  patch,
);

router.delete('/:id', validatorHandler(getCategorySchema, 'params'), destroy);

module.exports = router;
