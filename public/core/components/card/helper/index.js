

const helperComponent = document.querySelector(".widget-helper-unique-class");
const helperMessageComponent = document.querySelector(".widget-helper-message-unique-class"); 

function getHelpMessage(text, element, color = "red", ) {
  helperComponent.classList.add("widget-element-visible", `${color}`, "lighten-5", `${color}-text`);
  helperMessageComponent.classList.add("widget-element-visible");
  helperMessageComponent.innerHTML = `
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
    const elementOpenListCallsButton = document.querySelector(".widget-open-list-calls-unique-class"); 
    const elementCloseListCallsButton = document.querySelector(".widget-close-list-calls-unique-class");
    
    const close = () => {
      helperComponent.classList.remove("widget-element-visible", `${color}`, "lighten-5", `${color}-text`);
      helperMessageComponent.classList.remove("widget-element-visible");
    };

    elementCloseErrorMessageButton.addEventListener("click", close, { once: true });
    elementOpenListCallsButton.addEventListener("click", close, { once: true });
    elementCloseListCallsButton.addEventListener("click", close, { once: true });
  }

}

export {
  helperComponent,
  helperMessageComponent,
  getHelpMessage
}