import { fetchListCalls, fetchCreateCall } from "../../controllers/widget.controller.js";
import { elementSubscriber } from "./subscriber/index.js";
import { elementTitle, updateTitle } from  "./title/index.js";
import { elementDescription, updateDescription } from "./description/index.js";
import { elementFirstScreen, elementDate, elementTime, elementMessage } from "./first-screen/index.js";
import { elementSecondScreen, elementListCalls, printListCalls } from "./second-screen/index.js";
import { helperComponent, helperMessageComponent, getHelpMessage} from "./helper/index.js";
import { elementCreateButton, elementOpenButton, elementCloseButton, listiners } from "./buttons-group/index.js";

const SUBSCRIBER = elementSubscriber.getAttribute("data-phone");
let LISTCALLS = [];
const PARAMS = {
  LISTCALLS: LISTCALLS,
  SUBSCRIBER: SUBSCRIBER,
  buttons: {  
    open: elementOpenButton,
    close: elementCloseButton,
    create: elementCreateButton,
  },
  screen: {
    first: elementFirstScreen,
    second: elementSecondScreen,
  },
  call: {
    date: elementDate,
    time: elementTime,
    message: elementMessage,
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  // render new text
  updateTitle("Планировщик звонков");
  updateDescription("Вы можете запланировать звонок на конкретное время:");
  // fetch list calls
  LISTCALLS = await (await fetchListCalls(SUBSCRIBER)).json() || [];
  // - This is list calls for current subscriber
  // printListCalls(LISTCALLS);
  // createCall(date, time, message, getHelperMessage);
  listiners.open(updateTitle, updateDescription, fetchListCalls, printListCalls, PARAMS);
  listiners.create(createCall, getHelpMessage, fetchCreateCall, PARAMS);
});

function createCall(date, time, message, getHelpMessage, fetchCreateCall) {

  function formatter() {
    const dateArr = date.value.split(".");
    const timeArr = time.value.split(":");
    const dateTime = new Date(dateArr[2], dateArr[1] - 1, dateArr[0], timeArr[0], timeArr[1], 0);
    return dateTime.getTime();
  }

  function validation() {

    if (!date.value.length) {
      return getHelpMessage("Укажите дату", date);
    }
    if (!time.value.length) {
      return getHelpMessage("Укажите время", time);
    }
    if (!message.value.length) {
      return getHelpMessage("Напишите сообщение", message);
    }
    if (message.value.length > 60) {
      return getHelpMessage("Сократите свое голосовое сообщение", message);
    }
    if (formatter(date, time) < Date.now() + 1000 * 60 * 60 * 3) {
      return getHelpMessage("Для валидации голосового сообщения требуется больше времени (3 часа)", time);
    }
    return true;

  };

  async function create() {
    if (!validation()) return;

      const newCall = await(await fetchCreateCall({
        phone: SUBSCRIBER,
        time: this.formatter(date, time),
        message: message.value,
      })).json();

      console.log(newCall);

      return getHelpMessage("Звонок успешно запланирован", null, 'teal');
  }

  return {
    formatter,
    validation,
    create,
  }

}
function deleteCall() {
  return {
    send: async function () {
      console.log("deleteCall");
    }
  };
}
