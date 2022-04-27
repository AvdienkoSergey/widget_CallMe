const elementSecondScreen = document.querySelector(".widget-second-screen-unique-class");
const elementListCalls = document.querySelector(".widget-collection-calls-unique-class");


function printListCalls(LISTCALLS) {

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
  }

  clearListCalls();
  if (!LISTCALLS.length) return emptyListCalls();

  for (let index = 0; index < LISTCALLS.length; index++) {
    const { id, time, timeString, message } = LISTCALLS[index];

    pushCallInListCalls({ id, time, timeString, message });
  }
}

// function createEventForButton(id) {
//   const buttonDelete = document.getElementById(`button-delete-call-${id}-unique`);

//   buttonDelete.addEventListener("click", async () => {
//     console.log("deleteCall")
//   });
// }

module.exports = {
  elementSecondScreen,
  elementListCalls,
  printListCalls
}