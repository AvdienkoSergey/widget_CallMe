document.addEventListener("DOMContentLoaded", async function() {

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
    disableDayFn: (date) => {
      const now = new Date();
      now.setHours(0);
      now.setMinutes(0);
      now.setMilliseconds(0);
      if (now.getTime() - 1000*60 >= date.getTime()) return date;
    },
    firstDay: 1,
    i18n: {
      cancel: "Закрыть",
      clear: "Очистить",
      months: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентрябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      monthsShort: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ],
      weekdays: [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
      ],
      weekdays: [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ],
      weekdaysShort: [
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
      ],
      weekdaysAbbrev: [
        "В",
        "П",
        "В",
        "С",
        "Ч",
        "П",
        "С",
      ],
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
    createCall(elementData, elementTime, elementVoiceMessage, elementHelper, elementError, elementSuccess)
      .validate()
  });
  elementOpenListCallsButton.addEventListener("click", () => {
    // innerText
    elementTitle.innerText = "Запланированные звонки";
    elemntDescription.innerText = "Вы можете удалить звонок из списка, если в нем нет необходиомсти:";
    // addClass
    elementCreateCallButton.classList.add("widget-element-hidden");
    elementOpenListCallsButton.classList.add("widget-element-hidden");
    elementFirstScreen.classList.add("widget-element-hidden");
    // removeClass
    elementCloseListCallsButton.classList.remove("widget-element-hidden");
    elementSecondScreen.classList.remove("widget-element-hidden");
    // events
    const emptyListCalls = () => {
      elementListCalls.innerHTML = `<li class="collection-item">У вас нет запланированных звонков</li>`;
    };
    const notEmptyListCalls = (calls) => {
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
        `;
        // appendLi
        elementListCalls.append(elementCall);
        // event
        const buttonDelete = document.getElementById(`button-delete-call-${id}-unique`);
        buttonDelete.addEventListener("click", async () => {
          await deleteCall().send({
            phone: "",
            id: id,
          }); 
          !LISTCALLS.length ? emptyListCalls() : notEmptyListCalls(LISTCALLS);
        });
      };
      for (let index = 0; index < calls.length; index++) {
        const { id, time, timeString, message } = calls[index];
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

  const API = "http://localhost:3000/api/widget";
  const LISTCALLS = await getListCalls().send() || [];

  function getListCalls() {
    return {
      send: async function () {
        const phone = elementWidgetSettings.getAttribute("data-phone");
        const response = await fetch(API + "/" + phone, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        });
        const LISTCALLS = await response.json();
        return LISTCALLS; 
      }
    }; 
  }
  function createCall(date, time, message, helper, error, success) {
    return {
      date,
      time,
      message,
      helper,
      error,
      success,
      errorMessage: function (text, element) {
        this.helper.classList.add("widget-element-visible", "red", "lighten-5", "red-text");
        this.error.classList.add("widget-element-visible");
        this.error.innerHTML = `
          <span class="badge">
            <i class="material-icons red-text widget-error-close-button">
              cancel
            </i>
          </span>
          <span>${text}</span>
        `;
        element.focus();
        const elementCloseErrorMessageButton = document.querySelector(".widget-error-close-button");
        const close = () => {
          this.helper.classList.remove("widget-element-visible", "red", "lighten-5", "red-text");
          this.error.classList.remove("widget-element-visible");
        };
        elementCloseErrorMessageButton.addEventListener("click", close, { once: true });
        elementOpenListCallsButton.addEventListener("click", close, { once: true });
        elementCloseListCallsButton.addEventListener("click", close, { once: true });
      },
      successMessage: function (text) {
        // clear
        this.message.value = "";
        this.time.value = "";
        // add Class
        this.helper.classList.add("widget-element-visible", "teal", "lighten-5", "teal-text");
        this.error.classList.add("widget-element-visible");
        this.error.innerHTML = `
          <span class="badge">
            <i class="material-icons teal-text widget-success-close-button">
              cancel
            </i>
          </span>
          <span>${text}</span>
        `;
        const elementCloseSuccessMessageButton = document.querySelector(".widget-success-close-button");
        const close = () => {
          this.helper.classList.remove("widget-element-visible", "teal", "lighten-5", "teal-text");
          this.error.classList.remove("widget-element-visible");
        };
        elementCloseSuccessMessageButton.addEventListener("click", close, { once: true });
        elementOpenListCallsButton.addEventListener("click", close, { once: true });
        elementCloseListCallsButton.addEventListener("click", close, { once: true });
      },
      validate: function () {
        if (!this.date.value.length) {
          return this.errorMessage("Укажите дату", this.date);
        }
        if (!this.time.value.length) {
          return this.errorMessage("Укажите время", this.time);
        }
        if (!this.message.value.length) {
          return this.errorMessage("Напишите сообщение", this.message);
        }
        if (this.message.value.length > 60) {
          return this.errorMessage("Сократите свое голосовое сообщение", this.message);
        }
        const date = this.date.value.split(".");
        const time = this.time.value.split(":");
        const now = new Date(date[2], date[1] - 1, date[0], time[0], time[1], 0 );
        if (now.getTime() < Date.now() + 1000*60*60*3) {
          return this.errorMessage("Для валидации голосового сообщения требуется больше времени (3 часа)", this.time);
        }
        this.send(now.getTime());
      },
      send: async function (time) {
        const phone = elementWidgetSettings.getAttribute("data-phone");
        const callOptions = {
          phone: phone,
          time: time,
          message: message.value,
        };
        const response = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify(callOptions),
        });
        const call = await response.json();
        LISTCALLS.push(call);
        return this.successMessage("Звонок успешно запланирован");
      }
    }
  }
  function deleteCall() {
    return {
      send: async function () {
        console.log("deleteCall");
      }
    };
  }
  
});

