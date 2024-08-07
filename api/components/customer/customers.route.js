const express = require('express');
const validatorHandler = require('@middlewares/validator.handler');
const { checkPermission } = require('@middlewares/auth.handler');
const passport = require('passport');
const {
  updateCustomerSchema,
  createCustomerSchema,
  getCustomerSchema,
} = require('./customer.schema');
const {
  findAll,
  findOne,
  save,
  update,
  patch,
  destroy,
} = require('./customer.controller');

const router = express.Router();

router.get('/', findAll);

router.get('/:id', validatorHandler(getCustomerSchema, 'params'), findOne);

router.post('/', 
  passport.authenticate('jwt', { session: false }),
  checkPermission('createAny', 'customer'),
  validatorHandler(createCustomerSchema, 'body'),
  save
);

router.put(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  update,
);
router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  patch,
);

router.delete('/:id', validatorHandler(getCustomerSchema, 'params'), destroy);

module.exports = router;
