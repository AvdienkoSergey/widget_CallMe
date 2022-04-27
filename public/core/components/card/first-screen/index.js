const elementFirstScreen = document.querySelector(".widget-first-screen-unique-class");
const elementDate = document.getElementById("widget-date-unique-id");
const elementTime = document.getElementById("widget-time-unique-id");
const elementVoiceMessage = document.getElementById("widget-voice-message-unique-id");

M.Datepicker.init(elementDate, {
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

module.exports = {
  elementFirstScreen,
  elementDate,
  elementTime,
  elementMessage: elementVoiceMessage,
}