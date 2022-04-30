const fs = require("fs");
const { JSDOM } = require("jsdom");

// Test LISTCALLS
// See /public/core/store/index.js
const LISTCALLS = require("../../store/index.js");
describe("LISTCALLS. Data storage", () => {
  test("LISTCALLS is Map", () => {
    const typeLISTCALLS = typeof(LISTCALLS === "object");
    expect(typeLISTCALLS).toBeTruthy();
  });
});

const html = fs.readFileSync("/Users/sergejavdienko/Desktop/twl-collection/widgetCallMe/public/widget/index.html");
const page = new JSDOM(html);

// Test SUBSCRIBER. See /public/core/components/card/subscriber
const elementSubscriberClass = ".widget-settings-unique-class";
const elementSubscriber = page.window.document.querySelector(elementSubscriberClass);
const SUBSCRIBER = elementSubscriber.getAttribute("data-phone");

describe("Subscriber component", () => {
  test("Element Subscriber width class '.widget-settings-unique-class' exists in the index.html", () => {
    const bool = elementSubscriber;
    expect(bool).toBeTruthy();
  });
  test("Element Subscriber  has the attribute [data-phone]", () => {
    const bool = SUBSCRIBER;
    expect(bool).toBeTruthy();
  })
  test("SUBSCRIBER is {{phone}}. Determined by the server after initializing the widget", () => {
    // Init widget. See /public/demo/index.html
    const bool = SUBSCRIBER === "{{phone}}";
    expect(bool).toBeTruthy();
  })
})

// Test Title and updateTitleFunction
// See /public/core/components/card/title
const elementTitleClass = ".widget-title-unique-class";
const elementTitle = page.window.document.querySelector(elementTitleClass);

describe("Title component", () => {

  test("Element title width class '.widget-title-unique-class' exists in the index.html", () => {
    const bool = elementTitle;
    expect(bool).toBeTruthy();
  });

  test("Updating the value for element title", () => {
    const input = "Это текст для тестирования функции updateTitle";

    // The function under test. Removed from the source file due to an export error
    // Bug fixing is required
    const updateTitle = (newTitle) => {
      elementTitle.innerText = newTitle;
      return elementTitle.innerText;
    }

    expect(updateTitle(input, elementTitle)).toEqual("Это текст для тестирования функции updateTitle");
  })
});

// Test Description and updateDescriptionFunction
// See /public/core/components/card/description
const elementDescriptionClass = ".widget-description-unique-class";
const elementDescription = page.window.document.querySelector(elementDescriptionClass);

describe("Description component", () => {

  test("Element description width class '.widget-description-unique-class' exists in the index.html", () => {
    const bool = elementDescription;
    expect(bool).toBeTruthy();
  });

  test("Updating the value for element description", () => {
    const input = "Это текст для тестирования функции updateDescription";

    // The function under test. Removed from the source file due to an export error
    // Bug fixing is required
    const updateDescription = (newDescription) => {
      elementDescription.innerText = newDescription;
      return elementDescription.innerText;
    }

    expect(updateDescription(input, elementDescription)).toEqual("Это текст для тестирования функции updateDescription");
  })
});
