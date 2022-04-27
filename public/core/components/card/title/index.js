const elementTitle = document.querySelector(".widget-title-unique-class");

const updateTitle = (newTitle) => {
  elementTitle.innerText = newTitle;
}

module.exports = { elementTitle, updateTitle }