const express = require('express');
const USERS = require('../MOCK/USERS.json');
const router = express.Router();

router.get('/', (req, response) => {
  const { size } = req.query;
  const limit = size || USERS.length;
  const users = USERS.slice(0, limit);
  users.unshift({ total: users.length });
  response.json(users);
});
router.get('/:id', (req, response) => {
  const { id } = req.params;
  const userId = USERS.find((userId) => userId.user_id == id);
  if (userId) {
    response.json(userId);
  } else {
    response.status(404).json({ error: 'user no encontrado' });
  }
});
router.post('/',(req,res)=>{
  const body=req.body
  res.json({
    message:'User Created',
    data:body
  })
})
router.put('/:id',(req,res)=>{
  const {id}=req.params
  const body=req.body
  res.json({
    message:'User Updated',
    data:body,
    id
  })
})
router.patch('/:id',(req,res)=>{
  const {id}=req.params
  const body=req.body
  res.json({
    message:'User Path',
    data:body,
    id
  })
})
router.delete('/:id',(req,res)=>{
  const {id}=req.params
  res.json({
    message:'User deleted',
    id
  })
})
module.exports=router