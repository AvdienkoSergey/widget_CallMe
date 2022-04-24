const Boom = require('boom');

const CRUD = ( Store = new Map() ) => ({

  async get({ params: { id } }, res) {
    try {
      return res.status(200).send(Store);
    } catch (err) {
      console.log(err)
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async get_all(_, res) {
    try {
      return res.status(200).send(Store);
    } catch (err) {
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async create({ body }, res) {
    try {
      return res.status(200).send(Store);
    } catch (err) {
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async update({ params: { id }, body }, res) {
    try {
      return res.status(200).send(Store);
    } catch (err) {
      console.log(err)
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async delete({ params: { id } }, res) {
    try {
      return res.status(200).send({ status: "OK", message: "CRUD delete operation complited" });
    } catch (err) {
      return res.status(400).send(Boom.boomify(err));
    }
  },


});

module.exports = CRUD;