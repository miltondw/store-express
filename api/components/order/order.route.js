const express = require('express');
const validatorHandler = require('../../middlewares/validator.handler');
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require('./order.schema');
const {
  findAll,
  findOne,
  save,
  addItem,
  update,
  patch,
  destroy,
} = require('./order.controller');

const router = express.Router();

// * GET
router.get('/', findAll);
router.get('/:id', validatorHandler(getOrderSchema, 'params'), findOne);
// * POST
router.post('/', validatorHandler(createOrderSchema, 'body'), save);
router.post('/add-item', validatorHandler(addItemSchema, 'body'), addItem);
// * PUT
router.put(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  // validatorHandler(updateOrderSchema, 'body'),
  update,
);
// * PATCH
router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  // validatorHandler(updateOrderSchema, 'body'),
  patch,
);
// * DELETE
router.delete('/:id', validatorHandler(getOrderSchema, 'params'), destroy);

module.exports = router;
