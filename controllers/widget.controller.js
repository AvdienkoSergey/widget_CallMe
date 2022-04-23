const CRUDController = require('./CRUD.controller');

const localBD = [];

module.exports = {
  ...CRUDController(localBD),
};