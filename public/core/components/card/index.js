import { LISTCALLS, init, testListCall } from "../../store/index.js";
import { fetchListCalls, fetchCreateCall } from "../../controllers/widget.controller.js";
import { elementSubscriber } from "./subscriber/index.js";
import { updateTitle } from  "./title/index.js";
import { updateDescription } from "./description/index.js";
import { elementFirstScreen, elementDate, elementTime, elementMessage } from "./first-screen/index.js";
import { elementSecondScreen, printListCalls } from "./second-screen/index.js";
import { getHelpMessage} from "./helper/index.js";
import { elementCreateButton, elementOpenButton, elementCloseButton, elementPaginationUp, elementPaginationDown, listiners } from "./buttons-group/index.js";

const SUBSCRIBER = elementSubscriber.getAttribute("data-phone");

LISTCALLS = init(SUBSCRIBER);

const PARAMS = {
  SUBSCRIBER: SUBSCRIBER,
  buttons: {  
    open: elementOpenButton,
    close: elementCloseButton,
    create: elementCreateButton,
    paginationUp: elementPaginationUp,
    paginationDown: elementPaginationDown,
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
  updateTitle("Планировщик звонков");
  updateDescription("Вы можете запланировать звонок на конкретное время:");
  // fetch list calls
  LISTCALLS.set(SUBSCRIBER, await (await fetchListCalls(SUBSCRIBER)).json() || []);
  // - This is a list of calls for the current subscriber. 
  // - The subscriber is set in the basic settings when calling the widget
  // testListCall(); // Map(1) {'89607998292' => Array(0)}

  const FUNCTIONS = {
    updateTitleFunction: updateTitle,
    updateDescriptionFunction: updateDescription,
    updateListCalls: updateListCalls,
    getListCalls: getListCalls,
    updateSecondScreen: printListCalls,
    createCall: createCall,
    deleteCall: deleteCall,
    getHelpMessage: getHelpMessage,
    fetchListCalls: fetchListCalls,
  }
  listiners.open(FUNCTIONS, PARAMS);
  listiners.create(FUNCTIONS, PARAMS);
  listiners.paginationUp(FUNCTIONS, PARAMS);
  listiners.paginationDown(FUNCTIONS, PARAMS);
});

async function updateListCalls() {
  LISTCALLS.set(SUBSCRIBER, await (await fetchListCalls(SUBSCRIBER)).json() || []);
  return LISTCALLS;
}
function getListCalls() {
  return LISTCALLS;
}
function createCall(date, time, message, getHelpMessage) {

  function formatter() {
    const dateArr = date.value.split(".");
    const timeArr = time.value.split(":");
    const dateTime = new Date(dateArr[2], dateArr[1] - 1, dateArr[0], timeArr[0], timeArr[1], 0);
    return dateTime.getTime();
  };
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

      await(await fetchCreateCall({
        phone: SUBSCRIBER,
        time: this.formatter(date, time),
        message: message.value,
      })).json();

      LISTCALLS.set(SUBSCRIBER, await (await fetchListCalls(SUBSCRIBER)).json() || []);
      testListCall(); // Map(1) {'89607998292' => Array(1)}

      return getHelpMessage("Звонок успешно запланирован", null, 'teal');
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
