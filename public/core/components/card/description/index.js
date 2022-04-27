const elementDescription = document.querySelector(".widget-description-unique-class");

const updateDescription = (newDescription) => {
  elementDescription.innerText = newDescription;
}

module.exports = { updateDescription }