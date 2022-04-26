const CRUDController = require('./CRUD.controller');

const Store = new Map();

class VoiceMessage {
  constructor() {
    this.subscriber = '';
    this.message = '';
  }

  setSubscriber(phone) {
    this.subscriber = phone;
  }
  setMessage(message) {
    this.message = message;
  }
};

module.exports = {
  ...CRUDController(VoiceMessage, Store),
};