const express = require('express');
const validatorHandler = require('@middlewares/validator.handler');
const { checkPermission } = require('@middlewares/auth.handler');
const passport = require('passport');
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

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkPermission('createAny', 'category'),
  validatorHandler(createCategorySchema, 'body'),
  save,
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkPermission('updateAny', 'category'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  update,
);
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkPermission('updateAny', 'category'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  patch,
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkPermission('deleteAny', 'category'),
  validatorHandler(getCategorySchema, 'params'),
  destroy,
);

module.exports = router;
