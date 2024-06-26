const Joi = require('joi');

const message = (type) => ({
  'string.base': `"${type}" debe ser un tipo de 'texto'`,
  'string.empty': `"${type}" no puede ser un campo vacío`,
  'string.min': `"${type}" debe tener una longitud mínima de {#limit}`,
  'string.max': `"${type}" debe tener una longitud máxima de {#limit}`,
});

const name = Joi.string().min(3).max(30).messages(message('name'));
const description = Joi.string()
  .min(5)
  .max(250)
  .messages(message('description'));
const price = Joi.number().integer();
const stock_quantity = Joi.number().integer();
const createdAt = Joi.date();
const updatedAt = Joi.date();
const availability = Joi.boolean();
const image_url = Joi.string().uri();
const id = Joi.string();
const categoryId = Joi.number().integer();

const limit = Joi.number();
const offset = Joi.number();
//Filter price min and max
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  availability: availability.required(),
  stock_quantity: stock_quantity.required(),
  image_url: image_url.required(),
  categoryId: categoryId.required(),
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
  updatedAt,
});

const getProductSchema = Joi.object({
  id: id.required(),
});
const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: price_min.required(),
    then: Joi.required(),
  }),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema,queryProductSchema };
