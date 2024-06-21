const Joi = require('joi');

const message=(type)=>({
    'string.base': `"${type}" debe ser un tipo de 'texto'`,
    'string.empty': `"${type}" no puede ser un campo vacío`,
    'string.min': `"${type}" debe tener una longitud mínima de {#limit}`,
    'string.max': `"${type}" debe tener una longitud máxima de {#limit}`,
  })

const name = Joi.string().min(3).max(30).messages(message('name'));
const description = Joi.string().min(5).max(250).messages(message('description'));
const price = Joi.number();
const stock_quantity = Joi.number();
const createdAt=Joi.date()
const updatedAt=Joi.date()
const availability = Joi.boolean();
const image_url = Joi.string().uri();
const id = Joi.string();
const categoryId = Joi.number();

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  availability: availability.required(),
  stock_quantity: stock_quantity.required(),
  image_url: image_url.required(),
  categoryId:categoryId.required(),

});

const updateProductSchema = Joi.object({
  name,
  description,
  price,
  stock_quantity,
  availability,
  image_url,
  categoryId,
  createdAt,
  updatedAt
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
