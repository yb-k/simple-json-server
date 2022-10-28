const Joi = require('joi');

const createTodo = {
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};

const getTodo = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const updateTodo = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    content: Joi.string(),
    completed: Joi.boolean(),
  }),
};

module.exports = {
  createTodo,
  getTodo,
  updateTodo,
};
