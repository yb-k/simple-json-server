const Joi = require('joi');

const createBoard = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    thumnail: Joi.string().default(''),
  }),
};

const getBoard = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const updateBoard = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    thumnail: Joi.string().default(''),
  }),
};

module.exports = {
  createBoard,
  getBoard,
  updateBoard,
};
