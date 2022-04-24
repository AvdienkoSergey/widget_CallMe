document.addEventListener("DOMContentLoaded", function() {

  const elementData = document.getElementById("date");
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

  const elementTime = document.getElementById("time");
  M.Timepicker.init(elementTime, {
    twelveHour: false,
    i18n: {
      cancel: "Закрыть",
      clear: "Очистить",
      done: "OK"
    }
  });

  const elementVoiceMessage = document.getElementById("voice");
  M.CharacterCounter.init(elementVoiceMessage);

  const elementHelper = document.getElementById("helper");
  const elementError = document.getElementById("error"); 
  const elementSuccess = document.getElementById("success"); 

  function createCall(data, time, message, helper, error, success) {
    return {
      data,
      time,
      message,
      helper,
      error,
      success,
      errorMessage: function (message, element) {
        this.helper.classList.add("visible", "red", "lighten-5", "red-text");
        this.error.classList.add("visible");
        this.error.innerHTML = message;
        element.focus();
        setTimeout(() => {
          this.helper.classList.remove("visible", "red", "lighten-5", "red-text");
          this.error.classList.remove("visible");
        }, 3000);
      },
      successMessage: function (message) {
        this.helper.classList.add("visible", "teal", "lighten-5", "teal-text");
        this.error.classList.add("visible");
        this.error.innerHTML = message;
        setTimeout(() => {
          this.helper.classList.remove("visible", "teal", "lighten-5", "teal-text");
          this.error.classList.remove("visible");
        }, 3000);
      },
      validate: function () {
        if (!this.data.value.length) {
          return this.errorMessage('Укажите дату', this.data);
        }
        if (!this.time.value.length) {
          return this.errorMessage('Укажите время', this.time);
        }
        if (!this.message.value.length) {
          return this.errorMessage('Напишите сообщение', this.message);
        }
        if (this.message.value.length > 60) {
          return this.errorMessage('Сократите свое голосовое сообщение', this.message);
        }
        const data = this.data.value.split(".");
        const time = this.time.value.split(":");
        const now = new Date(data[2], data[1] - 1, data[0], time[0], time[1], 0 );
        if (now.getTime() < Date.now() + 1000*60*60*3) {
          return this.errorMessage('Для валидации голосового сообщения требуется больше времени (3 часа)', this.time);
        }
        return this.successMessage('Звонок успешно запланирован. Спасибо!');
      }
    }
  }

  const createButton = document.getElementById("create");
  const listButton = document.getElementById("list");

  createButton.addEventListener("click", () => {
    createCall(elementData, elementTime, elementVoiceMessage, elementHelper, elementError, elementSuccess)
      .validate();
  })
  
});

