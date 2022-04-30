import { LISTCALLS, init, getListCalls, updateListCalls, createCall, deleteCall } from "../../store/index.js";
import { fetchListCalls, fetchCreateCall } from "../../controllers/widget.controller.js";
import { updateText } from "./src/udpadeText.js";
import { elementSubscriber } from "./subscriber/index.js";
import { elementTitle } from  "./title/index.js";
import { elementDescription } from "./description/index.js";
import { elementFirstScreen, elementDate, elementTime, elementMessage } from "./first-screen/index.js";
import { elementSecondScreen, printListCalls } from "./second-screen/index.js";
import { getHelpMessage} from "./helper/index.js";
import { elementCreateButton, elementOpenButton, elementCloseButton, elementPaginationUp, elementPaginationDown, listiners } from "./buttons-group/index.js";

const SUBSCRIBER = elementSubscriber.getAttribute("data-phone") || "[ВНИМАНИЕ]: Не определен номер";;

LISTCALLS = init(SUBSCRIBER);

document.addEventListener("DOMContentLoaded", async function () {
  updateText("Планировщик звонков", elementTitle);
  updateText("Вы можете запланировать звонок на конкретное время:", elementDescription);
  // fetch list calls
  LISTCALLS.set(SUBSCRIBER, await (await fetchListCalls(SUBSCRIBER)).json() || []);
  // - This is a list of calls for the current subscriber.
  // - Map(1) = (LISTCALLS) {'your number phone = (SUBSCRIBER)' => Array(0) = (CALLS)} 
  // - The subscriber is set in the basic settings when calling the widget
  
  const PARAMS = {
    SUBSCRIBER: SUBSCRIBER,
    title: elementTitle,
    description: elementDescription,
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
  const FUNCTIONS = {
    updateText: updateText,
    updateListCalls: updateListCalls,
    getListCalls: getListCalls,
    updateSecondScreen: printListCalls,
    createCall: createCall,
    deleteCall: deleteCall,
    getHelpMessage: getHelpMessage,
    fetchListCalls: fetchListCalls,
    fetchCreateCall: fetchCreateCall,
  }
  listiners.open(FUNCTIONS, PARAMS);
  listiners.create(FUNCTIONS, PARAMS);
  listiners.paginationUp(FUNCTIONS, PARAMS);
  listiners.paginationDown(FUNCTIONS, PARAMS);
});
