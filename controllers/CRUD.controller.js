const Boom = require('boom');

const CRUD = ( ModelVoiceMessage, Store = new Map() ) => ({

  async get({ params: { id } }, res) {
    try {

      const Subscriber = id;

      let LISTCALLS = [];
      Store.has(Subscriber) ? LISTCALLS = Store.get(Subscriber) : LISTCALLS = [];

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
      const VoiceMessage = new ModelVoiceMessage();

      VoiceMessage.setSubscriber(body.phone);
      VoiceMessage.setMessage(body.message);

      const Call = ({ time }) => {
        return {
          create: (message) => {
            const formatTime = () => {
              const timeStyle = new Intl.DateTimeFormat("ru", { timeStyle: "short" }).format(time);
              const dateStyle = new Intl.DateTimeFormat("ru", { dateStyle: "short" }).format(time)
              const timeString = `${timeStyle}, ${dateStyle}`;
              return { 
                time: time,
                timeString: timeString,
              }
            }
            return {
              id: Date.now(),
              time: formatTime().time,
              timeString: formatTime().timeString,
              message: message,
            }
          }
        }
      }

      let LISTCALLS = [];
      Store.has(VoiceMessage.subscriber) ? LISTCALLS = Store.get(VoiceMessage.subscriber) : LISTCALLS = [];

      LISTCALLS.push(Call(body).create(VoiceMessage.message));

      Store.set(VoiceMessage.subscriber, LISTCALLS);

      return res.status(200).send(Call(body).create(VoiceMessage.message));
    } catch (err) {
      console.log(err)
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