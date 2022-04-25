const Boom = require('boom');

const CRUD = ( Store = new Map() ) => ({

  async get({ params: { id } }, res) {
    try {
      console.log(id)
      const phone = id;
      let LISTCALLS = [];
      Store.has(phone) ? LISTCALLS = Store.get(phone) : LISTCALLS = [];
      console.log(Store.get(phone))
      console.log(LISTCALLS)
      return res.status(200).send(LISTCALLS);
    } catch (err) {
      console.log(err)
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async get_all(_, res) {
    try {
      return res.status(200).send('[ВНИМАНИЕ]: Это не возможно!');
    } catch (err) {
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async create({ body }, res) {
    try {
      const phone = body.phone;
      const timeStyle = new Intl.DateTimeFormat("ru", { timeStyle: "short" }).format(body.time);
      const dateStyle = new Intl.DateTimeFormat("ru", { dateStyle: "short" }).format(body.time)
      const timeString = `${timeStyle}, ${dateStyle}`;
      const saveObject = {
        id: Date.now(),
        time: body.time,
        timeString: timeString,
        message: body.message,
      }
      let LISTCALLS = [];
      Store.has(phone) ? LISTCALLS = Store.get(phone) : LISTCALLS = [];
      console.log(Store.get(phone))
      console.log(LISTCALLS)
      LISTCALLS.push(saveObject);
      Store.set(phone, LISTCALLS);
      return res.status(200).send(saveObject);
    } catch (err) {
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async update({ params: { id }, body }, res) {
    try {
      return res.status(200).send('[ВНИМАНИЕ]: Это не возможно!');
    } catch (err) {
      console.log(err)
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async delete({ params: { id } }, res) {
    try {
      return res.status(200).send({ status: "[ВНИМАНИЕ]: ", message: "Удаление успешно завершено" });
    } catch (err) {
      return res.status(400).send(Boom.boomify(err));
    }
  },


});

module.exports = CRUD;