const LISTCALLS = new Map();
// - subscriber: [ Call ]

function init(SUBSCRIBER, listCalls = LISTCALLS) {
  listCalls.set(SUBSCRIBER.toString(), []);
  return listCalls;
}
function getListCalls(listCalls = LISTCALLS) {
  return listCalls;
}
async function updateListCalls(fetchListCalls, SUBSCRIBER, listCalls = LISTCALLS) {
  listCalls.set(SUBSCRIBER, await (await fetchListCalls(SUBSCRIBER)).json() || []);
  return listCalls;
}
function createCall(getHelpMessage, fetchCreateCall, fetchListCalls, date, time, message, SUBSCRIBER, listCalls = LISTCALLS) {

  function formatter(date, time) {
    const dateArr = date.value.split(".");
    const timeArr = time.value.split(":");
    const dateTime = new Date(dateArr[2], dateArr[1] - 1, dateArr[0], timeArr[0], timeArr[1], 0);
    return dateTime.getTime();
  };
  
  function validation(date, time, message, getHelpMessage) {

    if (!date.value.length) {
      getHelpMessage("Укажите дату", date);
      return false;
    }
    if (!Array.isArray(date.value.split(".")) || date.value.split(".").length !== 3) {
      getHelpMessage("Укажите дату в формате 01.01.2000", date);
      return false;
    }
    if (!time.value.length) {
      getHelpMessage("Укажите время", time);
      return false;
    }
    if (!Array.isArray(time.value.split(":")) || time.value.split(":").length !== 2) {
      getHelpMessage("Укажите время в формате 09:00", time);
      return false;
    }
    if (!message.value.length) {
      getHelpMessage("Напишите сообщение", message);
      return false;
    }
    if (message.value.length > 60) {
      getHelpMessage("Сократите свое голосовое сообщение", message);
      return false;
    }
    if (formatter(date, time) < Date.now() + 1000 * 60 * 60 * 3) {
      getHelpMessage("Время для валидации (3 часа)", time);
      return false;
    }
    return true;
  };

  async function create() {
    if (!validation(date, time, message, getHelpMessage)) return false;
      try {
        await(await fetchCreateCall({
          phone: SUBSCRIBER,
          time: this.formatter(date, time),
          message: message.value,
        })).json();
        listCalls.set(SUBSCRIBER, await (await fetchListCalls(SUBSCRIBER)).json() || []);
        // Map(1) {'your phone number' => Array(1)}
        getHelpMessage("Звонок успешно запланирован", null, 'teal');
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
  }

  return {
    formatter,
    validation,
    create,
  }
}
async function deleteCall(id) {
  console.log(id);
}

module.exports = {
  LISTCALLS,
  init,
  getListCalls,
  updateListCalls,
  createCall,
  deleteCall,
}
