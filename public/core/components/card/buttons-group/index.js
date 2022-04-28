const elementCreateCallButton = document.querySelector(".widget-create-call-unique-class");
const elementOpenListCallsButton = document.querySelector(".widget-open-list-calls-unique-class"); 
const elementCloseListCallsButton = document.querySelector(".widget-close-list-calls-unique-class");

// Paginator
const elementPaginator = document.querySelector(".paginator-unique-class");
const elementLeftButton = document.querySelector(".paginator-unique-class__left-button");
const elementRightButton = document.querySelector(".paginator-unique-class__right-button");
const elementCurrentPage = document.querySelector(".paginator-unique-class__current-page");

const listiners = {
  create: (createCallFunction, getHelpMessage, fetchCreateCall, params) => {
    params.buttons.create.addEventListener("click", () => {
      const { date, time, message } = params.call;
      createCallFunction(date, time, message, getHelpMessage, fetchCreateCall, params.LISTCALLS)
        .create()
    });
  },
  open: (updateTitleFunction, updateDescriptionFunction, fetchListCalls, printListCalls, deleteCall, params) => {
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
      elementPaginator.classList.remove("widget-element-hidden");
      // add lister
      listiners.close(updateTitleFunction, updateDescriptionFunction, params);
      // events
      const LISTCALLS = await (await fetchListCalls(params.SUBSCRIBER)).json() || [];
      // print
      printListCalls(LISTCALLS, deleteCall);
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
      elementPaginator.classList.add("widget-element-hidden");
    });
  },
  paginationUp: (deleteCall, printListCalls, fetchListCalls, params) => {
    params.buttons.paginationUp.addEventListener("click", async() => {
      const LISTCALLS = await (await fetchListCalls(params.SUBSCRIBER)).json() || [];

      const count = Number(elementCurrentPage.textContent);
      if (count * 4 > LISTCALLS.length) return;

      elementCurrentPage.innerText = count + 1;

      printListCalls(LISTCALLS, deleteCall);
    });
  },
  paginationDown: (deleteCall, printListCalls, fetchListCalls, params) => {
    params.buttons.paginationDown.addEventListener("click", async() => {
      const LISTCALLS = await (await fetchListCalls(params.SUBSCRIBER)).json() || [];

      const count = Number(elementCurrentPage.textContent);
      if (!count || count == 1) return;

      elementCurrentPage.innerText = count - 1;

      printListCalls(LISTCALLS, deleteCall);
    });
  },
}

module.exports = {
  elementCreateButton: elementCreateCallButton,
  elementOpenButton: elementOpenListCallsButton,
  elementCloseButton: elementCloseListCallsButton,
  elementPaginationUp: elementRightButton,
  elementPaginationDown: elementLeftButton,
  listiners,
}