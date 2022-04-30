const elementWidgetSettings = document.querySelector(".widget-settings-unique-class");
const SUBSCRIBER = elementWidgetSettings.getAttribute("data-phone") || "[ВНИМАНИЕ]: Не определен номер";

module.exports = {
  elementSubscriber: elementWidgetSettings,
  subscriberPhone: SUBSCRIBER,
}