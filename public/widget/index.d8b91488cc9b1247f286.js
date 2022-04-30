/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/core/components/card/buttons-group/index.js":
/*!************************************************************!*\
  !*** ./public/core/components/card/buttons-group/index.js ***!
  \************************************************************/
/***/ ((module) => {

const elementCreateCallButton = document.querySelector(".widget-create-call-unique-class");
const elementOpenListCallsButton = document.querySelector(".widget-open-list-calls-unique-class");
const elementCloseListCallsButton = document.querySelector(".widget-close-list-calls-unique-class"); // Paginator

const elementPaginator = document.querySelector(".widget-paginator-unique-class");
const elementLeftButton = document.querySelector(".widget-paginator-unique-class__left-button");
const elementRightButton = document.querySelector(".widget-paginator-unique-class__right-button");
const elementCurrentPage = document.querySelector(".widget-paginator-unique-class__current-page");
const listiners = {
  create: ({
    createCall,
    getHelpMessage,
    fetchCreateCall,
    fetchListCalls
  }, params) => {
    params.buttons.create.addEventListener("click", () => {
      const {
        date,
        time,
        message
      } = params.call;
      const {
        SUBSCRIBER
      } = params;
      createCall(getHelpMessage, fetchCreateCall, fetchListCalls, date, time, message, SUBSCRIBER).create();
    });
  },
  open: ({
    updateText,
    updateSecondScreen,
    deleteCall,
    updateListCalls,
    fetchListCalls
  }, params) => {
    params.buttons.open.addEventListener("click", async () => {
      // render new text
      updateText("Запланированные звонки", params.title);
      updateText("Вы можете удалить звонок из списка, если в нем нет необходиомсти:", params.description); // addClass

      params.buttons.create.classList.add("widget-element-hidden");
      params.buttons.open.classList.add("widget-element-hidden");
      params.screen.first.classList.add("widget-element-hidden"); // removeClass

      params.buttons.close.classList.remove("widget-element-hidden");
      params.screen.second.classList.remove("widget-element-hidden");
      elementPaginator.classList.remove("widget-element-hidden"); // add lister

      listiners.close(updateText, params); // getListCalls

      const LISTCALLS = await updateListCalls(fetchListCalls, params.SUBSCRIBER); // print

      updateSecondScreen(LISTCALLS, params.SUBSCRIBER, deleteCall);
    });
  },
  close: (updateText, params) => {
    params.buttons.close.addEventListener("click", () => {
      // render new text
      updateText("Планировщик звонков", params.title);
      updateText("Вы можете запланировать звонок на конкретное время:", params.description); // addClass

      params.buttons.create.classList.remove("widget-element-hidden");
      params.buttons.open.classList.remove("widget-element-hidden");
      params.screen.first.classList.remove("widget-element-hidden"); // removeClass

      params.buttons.close.classList.add("widget-element-hidden");
      params.screen.second.classList.add("widget-element-hidden");
      elementPaginator.classList.add("widget-element-hidden");
    });
  },
  paginationUp: ({
    deleteCall,
    updateSecondScreen,
    getListCalls
  }, params) => {
    params.buttons.paginationUp.addEventListener("click", async () => {
      // getListCalls
      const LISTCALLS = await getListCalls();
      const count = Number(elementCurrentPage.textContent);
      if (count * 4 > LISTCALLS.get(params.SUBSCRIBER).length) return;
      if (!LISTCALLS.get(params.SUBSCRIBER).length) return;
      elementCurrentPage.innerText = count + 1;
      updateSecondScreen(LISTCALLS, params.SUBSCRIBER, deleteCall);
    });
  },
  paginationDown: ({
    deleteCall,
    updateSecondScreen,
    getListCalls
  }, params) => {
    params.buttons.paginationDown.addEventListener("click", async () => {
      const LISTCALLS = await getListCalls();
      const count = Number(elementCurrentPage.textContent);
      if (!count || count == 1) return;
      elementCurrentPage.innerText = count - 1;
      updateSecondScreen(LISTCALLS, params.SUBSCRIBER, deleteCall);
    });
  }
};
module.exports = {
  elementCreateButton: elementCreateCallButton,
  elementOpenButton: elementOpenListCallsButton,
  elementCloseButton: elementCloseListCallsButton,
  elementPaginationUp: elementRightButton,
  elementPaginationDown: elementLeftButton,
  listiners
};

/***/ }),

/***/ "./public/core/components/card/description/index.js":
/*!**********************************************************!*\
  !*** ./public/core/components/card/description/index.js ***!
  \**********************************************************/
/***/ ((module) => {

const elementDescriptionClass = ".widget-description-unique-class";
const elementDescription = document.querySelector(elementDescriptionClass);
module.exports = {
  elementDescription
};

/***/ }),

/***/ "./public/core/components/card/first-screen/index.js":
/*!***********************************************************!*\
  !*** ./public/core/components/card/first-screen/index.js ***!
  \***********************************************************/
/***/ ((module) => {

const elementFirstScreen = document.querySelector(".widget-first-screen-unique-class");
const elementDate = document.getElementById("widget-date-unique-id");
const elementTime = document.getElementById("widget-time-unique-id");
const elementVoiceMessage = document.getElementById("widget-voice-message-unique-id");
M.Datepicker.init(elementDate, {
  format: "dd.mm.yyyy",
  autoClose: false,
  defaultDate: new Date(),
  setDefaultDate: true,
  disableDayFn: date => {
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setMilliseconds(0);
    if (now.getTime() - 1000 * 60 >= date.getTime()) return date;
  },
  firstDay: 1,
  i18n: {
    cancel: "Закрыть",
    clear: "Очистить",
    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентрябрь", "Октябрь", "Ноябрь", "Декабрь"],
    monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    weekdays: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
    weekdays: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    weekdaysAbbrev: ["В", "П", "В", "С", "Ч", "П", "С"]
  }
});
M.Timepicker.init(elementTime, {
  twelveHour: false,
  i18n: {
    cancel: "Закрыть",
    clear: "Очистить",
    done: "OK"
  }
});
M.CharacterCounter.init(elementVoiceMessage);
module.exports = {
  elementFirstScreen,
  elementDate,
  elementTime,
  elementMessage: elementVoiceMessage
};

/***/ }),

/***/ "./public/core/components/card/helper/index.js":
/*!*****************************************************!*\
  !*** ./public/core/components/card/helper/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHelpMessage": () => (/* binding */ getHelpMessage),
/* harmony export */   "helperComponent": () => (/* binding */ helperComponent),
/* harmony export */   "helperMessageComponent": () => (/* binding */ helperMessageComponent)
/* harmony export */ });
const helperComponent = document.querySelector(".widget-helper-unique-class");
const helperMessageComponent = document.querySelector(".widget-helper-message-unique-class");

function getHelpMessage(text, element, color = "red") {
  helperComponent.classList.add("widget-element-visible", `${color}`, "lighten-5", `${color}-text`);
  helperMessageComponent.classList.add("widget-element-visible"); // innerHTML in helperMessageComponent

  const defaultMessage = `
    <span class="badge">
      <i class="material-icons ${color}-text widget-close-button">
        cancel
      </i>
    </span>
    <span>${text}</span>
  `;
  const linkMessage = `
    <span class="badge">
      <i class="material-icons ${color}-text widget-close-button">
        cancel
      </i>
    </span>
    <span>${text} <a class="widget-helper-link-unique-class">Подробнее</a></span>
  `;
  helperMessageComponent.innerHTML = text.indexOf('(3 часа)') !== -1 ? linkMessage : defaultMessage;
  element ? element.focus() : undefined; // add listers

  text.indexOf('(3 часа)') !== -1 ? initLink() : undefined;
  initCloseButton();

  function initCloseButton() {
    const elementCloseErrorMessageButton = document.querySelector(".widget-close-button");
    const elementOpenListCallsButton = document.querySelector(".widget-open-list-calls-unique-class");
    const elementCloseListCallsButton = document.querySelector(".widget-close-list-calls-unique-class");

    const close = () => {
      helperComponent.classList.remove("widget-element-visible", `${color}`, "lighten-5", `${color}-text`);
      helperMessageComponent.classList.remove("widget-element-visible");
    };

    elementCloseErrorMessageButton.addEventListener("click", close, {
      once: true
    });
    elementOpenListCallsButton.addEventListener("click", close, {
      once: true
    });
    elementCloseListCallsButton.addEventListener("click", close, {
      once: true
    });
  }

  function initLink() {
    const elementLink = document.querySelector(".widget-helper-link-unique-class");

    function link() {
      console.log('В разработке. Вызов модального окна или третий скрин');
    }

    elementLink.addEventListener("click", link, {
      once: true
    });
  }
}



/***/ }),

/***/ "./public/core/components/card/index.js":
/*!**********************************************!*\
  !*** ./public/core/components/card/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/index.js */ "./public/core/store/index.js");
/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_store_index_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_widget_controller_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../controllers/widget.controller.js */ "./public/core/controllers/widget.controller.js");
/* harmony import */ var _controllers_widget_controller_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_controllers_widget_controller_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_udpadeText_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/udpadeText.js */ "./public/core/components/card/src/udpadeText.js");
/* harmony import */ var _src_udpadeText_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_src_udpadeText_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _subscriber_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./subscriber/index.js */ "./public/core/components/card/subscriber/index.js");
/* harmony import */ var _subscriber_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_subscriber_index_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _title_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./title/index.js */ "./public/core/components/card/title/index.js");
/* harmony import */ var _title_index_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_title_index_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _description_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./description/index.js */ "./public/core/components/card/description/index.js");
/* harmony import */ var _description_index_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_description_index_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _first_screen_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./first-screen/index.js */ "./public/core/components/card/first-screen/index.js");
/* harmony import */ var _first_screen_index_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_first_screen_index_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _second_screen_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./second-screen/index.js */ "./public/core/components/card/second-screen/index.js");
/* harmony import */ var _second_screen_index_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_second_screen_index_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _helper_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helper/index.js */ "./public/core/components/card/helper/index.js");
/* harmony import */ var _buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./buttons-group/index.js */ "./public/core/components/card/buttons-group/index.js");
/* harmony import */ var _buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9__);










const SUBSCRIBER = _subscriber_index_js__WEBPACK_IMPORTED_MODULE_3__.elementSubscriber.getAttribute("data-phone") || "[ВНИМАНИЕ]: Не определен номер";
;
_store_index_js__WEBPACK_IMPORTED_MODULE_0__.LISTCALLS = (0,_store_index_js__WEBPACK_IMPORTED_MODULE_0__.init)(SUBSCRIBER);
document.addEventListener("DOMContentLoaded", async function () {
  (0,_src_udpadeText_js__WEBPACK_IMPORTED_MODULE_2__.updateText)("Планировщик звонков", _title_index_js__WEBPACK_IMPORTED_MODULE_4__.elementTitle);
  (0,_src_udpadeText_js__WEBPACK_IMPORTED_MODULE_2__.updateText)("Вы можете запланировать звонок на конкретное время:", _description_index_js__WEBPACK_IMPORTED_MODULE_5__.elementDescription); // fetch list calls

  _store_index_js__WEBPACK_IMPORTED_MODULE_0__.LISTCALLS.set(SUBSCRIBER, (await (await (0,_controllers_widget_controller_js__WEBPACK_IMPORTED_MODULE_1__.fetchListCalls)(SUBSCRIBER)).json()) || []); // - This is a list of calls for the current subscriber.
  // - Map(1) = (LISTCALLS) {'your number phone = (SUBSCRIBER)' => Array(0) = (CALLS)} 
  // - The subscriber is set in the basic settings when calling the widget

  const PARAMS = {
    SUBSCRIBER: SUBSCRIBER,
    title: _title_index_js__WEBPACK_IMPORTED_MODULE_4__.elementTitle,
    description: _description_index_js__WEBPACK_IMPORTED_MODULE_5__.elementDescription,
    buttons: {
      open: _buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9__.elementOpenButton,
      close: _buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9__.elementCloseButton,
      create: _buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9__.elementCreateButton,
      paginationUp: _buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9__.elementPaginationUp,
      paginationDown: _buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9__.elementPaginationDown
    },
    screen: {
      first: _first_screen_index_js__WEBPACK_IMPORTED_MODULE_6__.elementFirstScreen,
      second: _second_screen_index_js__WEBPACK_IMPORTED_MODULE_7__.elementSecondScreen
    },
    call: {
      date: _first_screen_index_js__WEBPACK_IMPORTED_MODULE_6__.elementDate,
      time: _first_screen_index_js__WEBPACK_IMPORTED_MODULE_6__.elementTime,
      message: _first_screen_index_js__WEBPACK_IMPORTED_MODULE_6__.elementMessage
    }
  };
  const FUNCTIONS = {
    updateText: _src_udpadeText_js__WEBPACK_IMPORTED_MODULE_2__.updateText,
    updateListCalls: _store_index_js__WEBPACK_IMPORTED_MODULE_0__.updateListCalls,
    getListCalls: _store_index_js__WEBPACK_IMPORTED_MODULE_0__.getListCalls,
    updateSecondScreen: _second_screen_index_js__WEBPACK_IMPORTED_MODULE_7__.printListCalls,
    createCall: _store_index_js__WEBPACK_IMPORTED_MODULE_0__.createCall,
    deleteCall: _store_index_js__WEBPACK_IMPORTED_MODULE_0__.deleteCall,
    getHelpMessage: _helper_index_js__WEBPACK_IMPORTED_MODULE_8__.getHelpMessage,
    fetchListCalls: _controllers_widget_controller_js__WEBPACK_IMPORTED_MODULE_1__.fetchListCalls,
    fetchCreateCall: _controllers_widget_controller_js__WEBPACK_IMPORTED_MODULE_1__.fetchCreateCall
  };
  _buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9__.listiners.open(FUNCTIONS, PARAMS);
  _buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9__.listiners.create(FUNCTIONS, PARAMS);
  _buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9__.listiners.paginationUp(FUNCTIONS, PARAMS);
  _buttons_group_index_js__WEBPACK_IMPORTED_MODULE_9__.listiners.paginationDown(FUNCTIONS, PARAMS);
});

/***/ }),

/***/ "./public/core/components/card/second-screen/index.js":
/*!************************************************************!*\
  !*** ./public/core/components/card/second-screen/index.js ***!
  \************************************************************/
/***/ ((module) => {

const elementSecondScreen = document.querySelector(".widget-second-screen-unique-class");
const elementListCalls = document.querySelector(".widget-collection-calls-unique-class");

function printListCalls(LISTCALLS, SUBSCRIBER, deleteCall) {
  function clearListCalls() {
    elementListCalls.innerHTML = "";
  }

  function emptyListCalls() {
    elementListCalls.innerHTML = `<li class="collection-item">У вас нет запланированных звонков</li>`;
  }

  function pushCallInListCalls(Call) {
    function printCall({
      id,
      timeString,
      message
    }) {
      const elementCall = document.createElement("li");
      elementCall.classList.add("collection-item", "avatar");
      elementCall.innerHTML = `
        <i class="material-icons circle teal-text teal lighten-5">call</i>
        <span class="title"> ${timeString} </span>
        <p>${message}</p>
        <a class="secondary-content widget-delete-call-button" id="button-delete-call-${id}-unique">
          <i class="material-icons red-text">delete</i>
        </a>
      `;
      return elementCall;
    }

    elementListCalls.append(printCall(Call));
    createEventForButton(Call.id, deleteCall);
  }

  if (!LISTCALLS.get(SUBSCRIBER).length) return emptyListCalls();
  clearListCalls();
  const PAGE = document.querySelector(".widget-paginator-unique-class__current-page");
  const startIndex = (Number(PAGE.textContent) - 1) * 4;
  const stopIndex = 4 * Number(PAGE.textContent);
  const listCalls = LISTCALLS.get(SUBSCRIBER).slice(startIndex, stopIndex); // Печать

  for (let index = 0; index < listCalls.length; index++) {
    const {
      id,
      time,
      timeString,
      message
    } = listCalls[index];
    pushCallInListCalls({
      id,
      time,
      timeString,
      message
    });
  }
}

function createEventForButton(id, deleteCall) {
  const buttonDelete = document.getElementById(`button-delete-call-${id}-unique`);
  buttonDelete.addEventListener("click", async () => {
    await deleteCall(id);
  });
}

module.exports = {
  elementSecondScreen,
  elementListCalls,
  printListCalls
};

/***/ }),

/***/ "./public/core/components/card/src/udpadeText.js":
/*!*******************************************************!*\
  !*** ./public/core/components/card/src/udpadeText.js ***!
  \*******************************************************/
/***/ ((module) => {

const updateText = (newText, element) => {
  element.innerText = newText;
  return element.innerText;
};

module.exports = {
  updateText
};

/***/ }),

/***/ "./public/core/components/card/subscriber/index.js":
/*!*********************************************************!*\
  !*** ./public/core/components/card/subscriber/index.js ***!
  \*********************************************************/
/***/ ((module) => {

const elementWidgetSettings = document.querySelector(".widget-settings-unique-class");
module.exports = {
  elementSubscriber: elementWidgetSettings
};

/***/ }),

/***/ "./public/core/components/card/title/index.js":
/*!****************************************************!*\
  !*** ./public/core/components/card/title/index.js ***!
  \****************************************************/
/***/ ((module) => {

const elementTitleClass = ".widget-title-unique-class";
const elementTitle = document.querySelector(elementTitleClass);
module.exports = {
  elementTitle
};

/***/ }),

/***/ "./public/core/controllers/fetch.controller.js":
/*!*****************************************************!*\
  !*** ./public/core/controllers/fetch.controller.js ***!
  \*****************************************************/
/***/ ((module) => {

const API_URL = "http://localhost:3000/api/widget";

const request = async ({
  url,
  method,
  data = {}
}) => {
  let response = null;

  switch (method) {
    case "GET":
      try {
        response = await fetch(API_URL + url, {
          method: method,
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        });
      } catch (error) {
        console.log(error);
      }

      break;

    case "POST":
      try {
        response = await fetch(API_URL + url, {
          method: method,
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify(data)
        });
      } catch (error) {
        console.log(error);
      }

      break;
  }

  return response;
};

module.exports = {
  request
};

/***/ }),

/***/ "./public/core/controllers/widget.controller.js":
/*!******************************************************!*\
  !*** ./public/core/controllers/widget.controller.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  request
} = __webpack_require__(/*! ./fetch.controller */ "./public/core/controllers/fetch.controller.js"); // request --> from ./fetch.controller


const fetchListCalls = subscriberPhone => request({
  url: `/${subscriberPhone}`,
  method: 'GET'
});

const fetchCreateCall = call => request({
  url: `/`,
  method: 'POST',
  data: call
});

module.exports = {
  fetchListCalls,
  fetchCreateCall
};

/***/ }),

/***/ "./public/core/store/index.js":
/*!************************************!*\
  !*** ./public/core/store/index.js ***!
  \************************************/
/***/ ((module) => {

const LISTCALLS = new Map(); // - subscriber: [ Call ]

function init(SUBSCRIBER, listCalls = LISTCALLS) {
  listCalls.set(SUBSCRIBER.toString(), []);
  return listCalls;
}

function getListCalls(listCalls = LISTCALLS) {
  return listCalls;
}

async function updateListCalls(fetchListCalls, SUBSCRIBER, listCalls = LISTCALLS) {
  listCalls.set(SUBSCRIBER, (await (await fetchListCalls(SUBSCRIBER)).json()) || []);
  return listCalls;
}

function createCall(getHelpMessage, fetchCreateCall, fetchListCalls, date, time, message, SUBSCRIBER, listCalls = LISTCALLS) {
  function formatter(date, time) {
    const dateArr = date.value.split(".");
    const timeArr = time.value.split(":");
    const dateTime = new Date(dateArr[2], dateArr[1] - 1, dateArr[0], timeArr[0], timeArr[1], 0);
    return dateTime.getTime();
  }

  ;

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
  }

  ;

  async function create() {
    if (!validation(date, time, message, getHelpMessage)) return false;

    try {
      await (await fetchCreateCall({
        phone: SUBSCRIBER,
        time: this.formatter(date, time),
        message: message.value
      })).json();
      listCalls.set(SUBSCRIBER, (await (await fetchListCalls(SUBSCRIBER)).json()) || []); // Map(1) {'your phone number' => Array(1)}

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
    create
  };
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
  deleteCall
};

/***/ }),

/***/ "./public/core/index.scss":
/*!********************************!*\
  !*** ./public/core/index.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./public/core/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/index.scss */ "./public/core/index.scss");
/* harmony import */ var _core_components_card_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/components/card/index.js */ "./public/core/components/card/index.js");
// CSS
 // JS Components


})();

/******/ })()
;
//# sourceMappingURL=index.d8b91488cc9b1247f286.js.map