const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const createdAt = Joi.date();
const updatedAt = Joi.date();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  email,
  role,
  createdAt,
  updatedAt,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
