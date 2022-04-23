const Boom = require('boom');

const CRUD = ( model, { get = '', getAll = '' } = {} ) => ({

  async get({ params: { id } }, res) {
    try {
      console.log('get')
      console.log(id)
      const item = await model.findById(id);
      return res.status(200).send(item);
    } catch (err) {
      console.log(err)
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async get_all(_, res) {
    try {
      console.log('get_all')
      const items = await model.find();
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async create({ body }, res) {
    try {
      console.log('create')
      console.log(body)
      const item = new model(body);
      const newItem = await item.save();
      console.log(newItem)
      return res.status(200).send(newItem);
    } catch (err) {
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async update({ params: { id }, body }, res) {
    try {
      console.log('update')
      console.log(id)
      console.log(body)
      const item = await model.findByIdAndUpdate(id, body, { new: true });
      return res.status(200).send(item);
    } catch (err) {
      console.log(err)
      return res.status(400).send(Boom.boomify(err));
    }
  },

  async delete({ params: { id } }, res) {
    try {
      console.log('delete')
      await model.findByIdAndDelete(id);
      return res.status(200).send({ status: "OK", message: "CRUD delete operation complited" });
    } catch (err) {
      return res.status(400).send(Boom.boomify(err));
    }
  },


});

module.exports = CRUD;