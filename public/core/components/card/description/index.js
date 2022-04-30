const elementDescriptionClass = ".widget-title-unique-class";
const elementDescription = document.querySelector(elementDescriptionClass);

const updateDescription = (newDescription) => {
  elementDescription.innerText = newDescription;
  return elementDescription.innerText;
}

module.exports = { updateDescription }