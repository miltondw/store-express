const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} = require('../schemas/product.schema');
const router = express.Router();

const service = new ProductsService();

router.get('/', async (req, res) => {
  const limit = req.query?.size || 10;
  const products = await service.getAll(limit);
  res.json(products);
});
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const productoId = await service.getOne(id);
      res.json(productoId);
    } catch (error) {
      next(error);
    }
  },
);
router.post('/',validatorHandler(createProductSchema,'body'), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: 'Product Created',
    data: { newProduct },
  });
});
router.put('/:id',validatorHandler(updateProductSchema,'body'),  async (req, res, next) => {
  try {
    const { id } = req.params;
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
});
router.patch('/:id',validatorHandler(updateProductSchema,'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const productPatch = await service.patch(id, body);
    res.json({
      message: 'Product Patch',
      data: productPatch,
      id,
    });
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await service.delete(id);
  res.json({
    message: 'Product deleted',
    id,
  });
});

module.exports = router;
