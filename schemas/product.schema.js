const Joi = require('joi');

const message=(type)=>({
    'string.base': `"${type}" debe ser un tipo de 'texto'`,
    'string.empty': `"${type}" no puede ser un campo vacío`,
    'string.min': `"${type}" debe tener una longitud mínima de {#limit}`,
    'string.max': `"${type}" debe tener una longitud máxima de {#limit}`,
  })

const name = Joi.string().min(3).max(30).messages(message('name'));
const description = Joi.string().min(5).max(250).messages(message('description'));
const category = Joi.string().min(3).max(100).messages(message('category'));
const price = Joi.number();
const quantity = Joi.number();
const release_date = Joi.string();
const image_url = Joi.string().uri();
const id = Joi.string();

const createProductSchema = Joi.object({
  name: name,
  description: description.required(),
  category: category.required(),
  price: price.required(),
  quantity: quantity.required(),
  release_date: release_date.required(),
  image_url: image_url.required(),
});

const updateProductSchema = Joi.object({
  name,
  description,
  category,
  price,
  quantity,
  release_date,
  image_url,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
