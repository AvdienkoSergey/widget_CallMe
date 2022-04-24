const CRUDController = require('./CRUD.controller');

const Store = new Map();

module.exports = {
  ...CRUDController(Store),
};