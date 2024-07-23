const express = require('express');
const validatorHandler = require('@middlewares/validator.handler');
const passport = require('passport');

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
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOrderSchema, 'body'),
  save,
);
router.post(
  '/add-item',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  addItem,
);
// * PUT
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  // validatorHandler(updateOrderSchema, 'body'),
  update,
);
// * PATCH
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  // validatorHandler(updateOrderSchema, 'body'),
  patch,
);
// * DELETE
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  destroy,
);

module.exports = router;
