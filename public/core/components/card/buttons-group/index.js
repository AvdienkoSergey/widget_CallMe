const elementCreateCallButton = document.querySelector(".widget-create-call-unique-class");
const elementOpenListCallsButton = document.querySelector(".widget-open-list-calls-unique-class"); 
const elementCloseListCallsButton = document.querySelector(".widget-close-list-calls-unique-class");

// Paginator
const elementPaginator = document.querySelector(".widget-paginator-unique-class");
const elementLeftButton = document.querySelector(".widget-paginator-unique-class__left-button");
const elementRightButton = document.querySelector(".widget-paginator-unique-class__right-button");
const elementCurrentPage = document.querySelector(".widget-paginator-unique-class__current-page");

const listiners = {
  create: ({ createCall, getHelpMessage }, params) => {
    params.buttons.create.addEventListener("click", () => {
      const { date, time, message } = params.call;
      createCall(date, time, message, getHelpMessage)
        .create()
    });
  },
  open: ({ updateTitleFunction, updateDescriptionFunction, updateSecondScreen, deleteCall, updateListCalls }, params) => {
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
      listiners.close(updateTitleFunction, updateDescriptionFunction, params)
      // getListCalls
      const LISTCALLS = await updateListCalls();
      // print
      updateSecondScreen(LISTCALLS, params.SUBSCRIBER, deleteCall);
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
  paginationUp: ({ deleteCall, updateSecondScreen, getListCalls }, params) => {
    params.buttons.paginationUp.addEventListener("click", async() => {
      // getListCalls
      const LISTCALLS = await getListCalls();

      const count = Number(elementCurrentPage.textContent);
      if (count * 4 > LISTCALLS.get(params.SUBSCRIBER).length) return;
      if (!LISTCALLS.get(params.SUBSCRIBER).length) return;

      elementCurrentPage.innerText = count + 1;

      updateSecondScreen(LISTCALLS, params.SUBSCRIBER, deleteCall);
    });
  },
  paginationDown: ({ deleteCall, updateSecondScreen, getListCalls }, params) => {
    params.buttons.paginationDown.addEventListener("click", async() => {
      const LISTCALLS = await getListCalls();

      const count = Number(elementCurrentPage.textContent);
      if (!count || count == 1) return;

      elementCurrentPage.innerText = count - 1;

      updateSecondScreen(LISTCALLS, params.SUBSCRIBER, deleteCall);
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