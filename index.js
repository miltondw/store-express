const express = require('express')
const app = express()
const port = 3000

const productos = [{
    id: '1',
    name: 'producto 1',
    price: 2000},
    {
      id: '2',
    name: 'producto 2',
    price: 1500
    },
    {
      id: '3',
    name: 'producto 3',
    price: 1550
    }
  ];
  app.get('/products', (_, response) =>{
    response.json(productos);
  });
  
  app.get('/products/:id', (req, response) =>{
    const { id } = req.params;
    const productoId = productos.find(productoId => productoId.id === id);
    if (productoId){
      response.json(productoId);
    }
    else{
      response.status(404).json({ error: "producto no encontrado"});
    }
  })
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})