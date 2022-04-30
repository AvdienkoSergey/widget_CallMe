const elementTitleClass = ".widget-title-unique-class";
const elementTitle = document.querySelector(elementTitleClass);

const updateTitle = (newTitle) => {
  elementTitle.innerText = newTitle;
  return elementTitle.innerText;
}

module.exports = { updateTitle }