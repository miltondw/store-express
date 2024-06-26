const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  queryProductSchema
} = require('../schemas/product.schema');
const {
  findAll,
  findOne,
  save,
  update,
  patch,
  destroy,
} = require('../controllers/product.controller');

const router = express.Router();

router.get('/',validatorHandler(queryProductSchema, 'query'), findAll);
router.get('/:id', validatorHandler(getProductSchema, 'params'), findOne);
router.post('/', validatorHandler(createProductSchema, 'body'), save);
router.put(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  update,
);
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  patch,
);
router.delete('/:id', validatorHandler(getProductSchema, 'params'), destroy);

module.exports = router;
