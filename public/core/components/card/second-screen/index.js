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

    function printCall({id, timeString, message}) {
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

  const listCalls = LISTCALLS.get(SUBSCRIBER).slice(startIndex, stopIndex);

  // Печать
  for (let index = 0; index < listCalls.length; index++) {
    const { id, time, timeString, message } = listCalls[index];
    pushCallInListCalls({ id, time, timeString, message });
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
}