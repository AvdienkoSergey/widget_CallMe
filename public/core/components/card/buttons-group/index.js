const elementCreateCallButton = document.querySelector(".widget-create-call-unique-class");
const elementOpenListCallsButton = document.querySelector(".widget-open-list-calls-unique-class"); 
const elementCloseListCallsButton = document.querySelector(".widget-close-list-calls-unique-class");

const listiners = {
  create: (createCallFunction, getHelpMessage, fetchCreateCall, params) => {
    params.buttons.create.addEventListener("click", () => {
      createCallFunction(params.call.date, params.call.time, params.call.message, getHelpMessage, fetchCreateCall, params.LISTCALLS)
        .create()
    });
  },
  open: (updateTitleFunction, updateDescriptionFunction, fetchListCalls, printListCalls, params) => {
    params.buttons.open.addEventListener("click", async() => {
      // render new text
      updateTitleFunction("Запланированные звонки");
      updateDescriptionFunction("Вы можете удалить звонок из списка, если в нем нет необходиомсти:")
      // addClass
      params.buttons.create.classList.add("widget-element-hidden");
      params.buttons.open.classList.add("widget-element-hidden");
      params.screen.first.classList.add("widget-element-hidden");
      // removeClass
      params.buttons.close.classList.remove("widget-element-hidden");
      params.screen.second.classList.remove("widget-element-hidden");
      // add lister
      listiners.close(updateTitleFunction, updateDescriptionFunction, params);
      // events
      params.LISTCALLS = await (await fetchListCalls(params.SUBSCRIBER)).json() || [];
      printListCalls(params.LISTCALLS);
    });
  },
  close: (updateTitleFunction, updateDescriptionFunction, params) => {
    params.buttons.close.addEventListener("click", () => {
      // render new text
      updateTitleFunction("Планировщик звонков");
      updateDescriptionFunction("Вы можете запланировать звонок на конкретное время:");
      // addClass
      params.buttons.create.classList.remove("widget-element-hidden");
      params.buttons.open.classList.remove("widget-element-hidden");
      params.screen.first.classList.remove("widget-element-hidden");
      // removeClass
      params.buttons.close.classList.add("widget-element-hidden");
      params.screen.second.classList.add("widget-element-hidden");
    });
  }
}

module.exports = {
  elementCreateButton: elementCreateCallButton,
  elementOpenButton: elementOpenListCallsButton,
  elementCloseButton: elementCloseListCallsButton,
  listiners,
}