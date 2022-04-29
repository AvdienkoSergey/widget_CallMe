

const helperComponent = document.querySelector(".widget-helper-unique-class");
const helperMessageComponent = document.querySelector(".widget-helper-message-unique-class"); 

function getHelpMessage(text, element, color = "red", ) {
  helperComponent.classList.add("widget-element-visible", `${color}`, "lighten-5", `${color}-text`);
  helperMessageComponent.classList.add("widget-element-visible");

  // innerHTML in helperMessageComponent
  const defaultMessage = `
    <span class="badge">
      <i class="material-icons ${color}-text widget-close-button">
        cancel
      </i>
    </span>
    <span>${text}</span>
  `;
  const linkMessage = `
    <span class="badge">
      <i class="material-icons ${color}-text widget-close-button">
        cancel
      </i>
    </span>
    <span>${text} <a class="widget-helper-link-unique-class">Подробнее</a></span>
  `;

  helperMessageComponent.innerHTML = text.indexOf('(3 часа)') !==  -1 ? linkMessage : defaultMessage;
  element ? element.focus() : undefined;

  // add listers
  text.indexOf('(3 часа)') !==  -1 ? initLink() : undefined;
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
  function initLink() {
    const elementLink = document.querySelector(".widget-helper-link-unique-class");
    function link() {
      console.log('В разработке. Вызов модального окна или третий скрин')
    }
    elementLink.addEventListener("click", link, { once: true });
  }

}

export {
  helperComponent,
  helperMessageComponent,
  getHelpMessage
}