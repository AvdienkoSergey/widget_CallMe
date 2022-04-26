/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/core/components/Card.component.js":
/*!**************************************************!*\
  !*** ./public/core/components/Card.component.js ***!
  \**************************************************/
/***/ (() => {

document.addEventListener("DOMContentLoaded", async function () {
  // [ 2 ] Разобраться с удалением
  // [ 3 ] Пагинация при LISTCALLS > 3
  const elementData = document.getElementById("widget-date-unique-id");
  const elementTime = document.getElementById("widget-time-unique-id");
  const elementVoiceMessage = document.getElementById("widget-voice-message-unique-id");
  const elementWidgetSettings = document.querySelector(".widget-settings-unique-class");
  const elementTitle = document.querySelector(".widget-title-unique-class");
  const elemntDescription = document.querySelector(".widget-description-unique-class");
  const elementFirstScreen = document.querySelector(".widget-first-screen-unique-class");
  const elementSecondScreen = document.querySelector(".widget-second-screen-unique-class");
  const elementListCalls = document.querySelector(".widget-collection-calls-unique-class");
  const elementHelper = document.querySelector(".widget-helper-unique-class");
  const elementError = document.querySelector(".widget-error-unique-class");
  const elementSuccess = document.querySelector(".widget-success-unique-class");
  const elementCreateCallButton = document.querySelector(".widget-create-call-unique-class");
  const elementOpenListCallsButton = document.querySelector(".widget-open-list-calls-unique-class");
  const elementCloseListCallsButton = document.querySelector(".widget-close-list-calls-unique-class");
  M.Datepicker.init(elementData, {
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
  elementCreateCallButton.addEventListener("click", () => {
    createCall(elementData, elementTime, elementVoiceMessage, elementHelper, elementError, elementSuccess).create();
  });
  elementOpenListCallsButton.addEventListener("click", () => {
    // innerText
    elementTitle.innerText = "Запланированные звонки";
    elemntDescription.innerText = "Вы можете удалить звонок из списка, если в нем нет необходиомсти:"; // addClass

    elementCreateCallButton.classList.add("widget-element-hidden");
    elementOpenListCallsButton.classList.add("widget-element-hidden");
    elementFirstScreen.classList.add("widget-element-hidden"); // removeClass

    elementCloseListCallsButton.classList.remove("widget-element-hidden");
    elementSecondScreen.classList.remove("widget-element-hidden"); // events

    const emptyListCalls = () => {
      elementListCalls.innerHTML = `<li class="collection-item">У вас нет запланированных звонков</li>`;
    };

    const notEmptyListCalls = calls => {
      elementListCalls.innerHTML = "";

      const appendlistCalls = (id, time, message) => {
        // create li
        const elementCall = document.createElement("li");
        elementCall.classList.add("collection-item", "avatar");
        elementCall.innerHTML = `
          <i class="material-icons circle teal-text teal lighten-5">call</i>
          <span class="title"> ${time} </span>
          <p>${message}</p>
          <a class="secondary-content widget-delete-call-button" id="button-delete-call-${id}-unique">
            <i class="material-icons red-text">delete</i>
          </a>
        `; // appendLi

        elementListCalls.append(elementCall); // event

        const buttonDelete = document.getElementById(`button-delete-call-${id}-unique`);
        buttonDelete.addEventListener("click", async () => {
          await deleteCall().send({
            phone: "",
            id: id
          });
          !LISTCALLS.length ? emptyListCalls() : notEmptyListCalls(LISTCALLS);
        });
      };

      for (let index = 0; index < calls.length; index++) {
        const {
          id,
          time,
          timeString,
          message
        } = calls[index];
        appendlistCalls(id, timeString, message);
      }
    };

    !LISTCALLS.length ? emptyListCalls() : notEmptyListCalls(LISTCALLS);
  });
  elementCloseListCallsButton.addEventListener("click", () => {
    elementTitle.innerText = "Планировщик звонков";
    elemntDescription.innerText = "Вы можете запланировать звонок на конкретное время:";
    elementCreateCallButton.classList.remove("widget-element-hidden");
    elementOpenListCallsButton.classList.remove("widget-element-hidden");
    elementFirstScreen.classList.remove("widget-element-hidden");
    elementCloseListCallsButton.classList.add("widget-element-hidden");
    elementSecondScreen.classList.add("widget-element-hidden");
  });
  const SUBSCRIBER = elementWidgetSettings.getAttribute("data-phone");
  const LISTCALLS = (await (await getListCalls(SUBSCRIBER)).json()) || [];

  function createCall(date, time, message, helper, helperMessage) {
    return {
      helperMessage: function (text, element, color = "red") {
        helper.classList.add("widget-element-visible", `${color}`, "lighten-5", `${color}-text`);
        helperMessage.classList.add("widget-element-visible");
        helperMessage.innerHTML = `
          <span class="badge">
            <i class="material-icons ${color}-text widget-close-button">
              cancel
            </i>
          </span>
          <span>${text}</span>
        `;
        element ? element.focus() : undefined;
        initCloseButton();

        function initCloseButton() {
          const elementCloseErrorMessageButton = document.querySelector(".widget-close-button");

          const close = () => {
            helper.classList.remove("widget-element-visible", `${color}`, "lighten-5", `${color}-text`);
            helperMessage.classList.remove("widget-element-visible");
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
      },
      formatter: function (date, time) {
        const dateArr = date.value.split(".");
        const timeArr = time.value.split(":");
        const dateTime = new Date(dateArr[2], dateArr[1] - 1, dateArr[0], timeArr[0], timeArr[1], 0);
        return dateTime.getTime();
      },
      validation: function () {
        if (!date.value.length) {
          return this.helperMessage("Укажите дату", date);
        }

        if (!time.value.length) {
          return this.helperMessage("Укажите время", time);
        }

        if (!message.value.length) {
          return this.helperMessage("Напишите сообщение", message);
        }

        if (message.value.length > 60) {
          return this.helperMessage("Сократите свое голосовое сообщение", message);
        }

        if (this.formatter(date, time) < Date.now() + 1000 * 60 * 60 * 3) {
          return this.helperMessage("Для валидации голосового сообщения требуется больше времени (3 часа)", time);
        }

        return true;
      },
      create: async function () {
        if (!this.validation()) return; // getNewCall --> from ./controller/widget.controller

        LISTCALLS.push(await (await getNewCall({
          phone: SUBSCRIBER,
          time: this.formatter(date, time),
          message: message.value
        })).json());
        return this.helperMessage("Звонок успешно запланирован", null, 'teal');
      }
    };
  } // Not ready


  function deleteCall() {
    return {
      send: async function () {
        console.log("deleteCall");
      }
    };
  }
});

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
/* harmony import */ var _core_components_Card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/components/Card.component */ "./public/core/components/Card.component.js");
/* harmony import */ var _core_components_Card_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_components_Card_component__WEBPACK_IMPORTED_MODULE_1__);
// CSS
 // JS Components


})();

/******/ })()
;
//# sourceMappingURL=index.10ac3dcbe671d6236ab3.js.map