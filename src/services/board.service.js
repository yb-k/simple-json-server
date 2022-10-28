const httpStatus = require('http-status');
const dayjs = require('dayjs');
const lodash = require('lodash');
const ApiError = require('../utils/ApiError');
const nextId = require('../utils/nextId');
const db = require('../config/lowdb');
const { defaultDateFormat } = require('../config/constants');
const userService = require('./user.service');

const getBoardDb = () => {
  return db.get('boards');
};

const getBoards = () => {
  const userMap = userService.getUsersMap();
  return getBoardDb()
    .map((item) => {
      // eslint-disable-next-line no-param-reassign
      item.writer = lodash.cloneDeep(userMap[item.userId]);
      return item;
    })
    .value();
};

const getBoardsByUserId = (userId) => {
  return getBoardDb().filter({ userId });
};

const getBoardById = (id) => {
  const board = getBoardDb().find({ id }).value();
  board.writer = userService.getUserById(board.userId);
  return board;
};

const createBoard = (userId, payload) => {
  const boardDb = getBoardDb();
  const id = nextId(boardDb);
  boardDb.push({ id, userId, ...payload, regDate: dayjs().format(defaultDateFormat) }).write();
  return boardDb.find({ id }).value();
};

const updateBoardById = (id, userId, payload) => {
  const board = getBoardsByUserId(userId).find({ id }).value();
  if (!board) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Todo not found');
  }
  getBoardDb()
    .find(board)
    .merge({
      ...payload,
    })
    .write();
  return getBoardById(id);
};

const deleteBoardById = (id, userId) => {
  const board = getBoardsByUserId(userId).find({ id }).value();
  if (!board) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Todo not found');
  }
  getBoardDb().remove({ id }).write();
};

module.exports = {
  getBoardById,
  getBoards,
  createBoard,
  updateBoardById,
  deleteBoardById,
};
