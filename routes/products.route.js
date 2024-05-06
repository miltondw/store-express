const express = require('express');
const PRODUCTS = require('../MOCK/PRODUCTS.json');
const router = express.Router();

router.get('/', (req, response) => {
  const { size } = req.query;
  const limit = size || PRODUCTS.length;
  const products = PRODUCTS.slice(0, limit);
  products.unshift({ total: products.length });
  response.json(products);
});
router.get('/:id', (req, response) => {
  const { id } = req.params;
  const productoId = PRODUCTS.find(
    (productoId) => productoId.product_sku == id,
  );
  if (productoId) {
    response.json(productoId);
  } else {
    response.status(404).json({ error: 'producto no encontrado' });
  }
});
router.post('/',(req,res)=>{
  const body=req.body
  res.json({
    message:'Product Created',
    data:body
  })
})
router.put('/:id',(req,res)=>{
  const {id}=req.params
  const body=req.body
  res.json({
    message:'Product Updated',
    data:body,
    id
  })
})
router.patch('/:id',(req,res)=>{
  const {id}=req.params
  const body=req.body
  res.json({
    message:'Product Patch',
    data:body,
    id
  })
})
router.delete('/:id',(req,res)=>{
  const {id}=req.params
  res.json({
    message:'Product deleted',
    id
  })
})

module.exports=router
