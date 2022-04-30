const updateText = (newText, element) => {
  element.innerText = newText;
  return element.innerText;
}

module.exports = {
  updateText
}