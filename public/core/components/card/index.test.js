// npm test -- --coverage

// > widgetcallme@1.0.0 test
// > jest "--coverage"

//  PASS  public/core/components/card/index.test.js
//   LISTCALLS. Data storage
//     ✓ LISTCALLS is Map object (1 ms)
//     ✓ Initialization LISTCALLS. Push { SUBSCRIBER: empty Array } in LISTCALLS (1 ms)
//     ✓ Return LISTCALLS. LISTCALLS instanceof Map (1 ms)
//     ✓ Update LISTCALLS. Functions updateListCalls and fetchListCalls work (1 ms)
//     CreateCall work. Push Call in LISTCALLS. Map (1) { SUBSCRIBER: [ Call ] }
//       ✓ Function formatter work
//       ✓ Function validation work (1 ms)
//       ✓ Functions createCall and fetchCreateCall work (1 ms)
//   Subscriber component
//     ✓ Element Subscriber width class '.widget-settings-unique-class' exists in the index.html
//     ✓ Element Subscriber  has the attribute [data-phone] (1 ms)
//     ✓ SUBSCRIBER is {{phone}}. Determined by the server after initializing the widget (1 ms)
//   Title component
//     ✓ Element title width class '.widget-title-unique-class' exists in the index.html (1 ms)
//     ✓ Updating the value for element title (2 ms)
//   Description component
//     ✓ Element description width class '.widget-description-unique-class' exists in the index.html
//     ✓ Updating the value for element description (1 ms)
//   FirstScreen Component
//     ✓ Element first screen width class '.widget-first-screen-unique-class' exists in the index.html
//     ✓ Element date width id 'widget-date-unique-id' exists in the index.html
//     ✓ Element time width id 'widget-time-unique-id' exists in the index.html
//     ✓ Element voice message width id 'widget-voice-message-unique-id' exists in the index.html (1 ms)

// -----------------------|---------|----------|---------|---------|----------------------------------------------------
// File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                  
// -----------------------|---------|----------|---------|---------|----------------------------------------------------
// All files              |   70.58 |    64.51 |   91.66 |   70.76 |                                                    
//  components/card/src   |     100 |      100 |     100 |     100 |                                                    
//   udpadeText.js        |     100 |      100 |     100 |     100 |                                                    
//  controllers           |      90 |      100 |     100 |   88.88 |                                                    
//   fetch.controller.js  |   85.71 |      100 |     100 |   85.71 | 21,35                                              
//   widget.controller.js |     100 |      100 |     100 |     100 |                                                    
//  store                 |   59.09 |    60.71 |    87.5 |   60.46 |                                                    
//   index.js             |   59.09 |    60.71 |    87.5 |   60.46 | 27-28,31-32,35-36,39-40,43-44,47-48,51-52,70-71,82 
// -----------------------|---------|----------|---------|---------|----------------------------------------------------
// Test Suites: 1 passed, 1 total
// Tests:       18 passed, 18 total
// Snapshots:   0 total
// Time:        1.273 s
// Ran all test suites.

const fs = require("fs");
const { JSDOM } = require("jsdom");
const { LISTCALLS, init, getListCalls, updateListCalls, createCall, deleteCall } = require("../../store/index.js");
const { fetchListCalls, fetchCreateCall } = require("../../controllers/widget.controller.js");
const { updateText } = require("./src/udpadeText.js");

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

// Test LISTCALLS
// See /public/core/store/index.js
describe("LISTCALLS. Data storage", () => {
  test("LISTCALLS is Map object", () => {
    const typeLISTCALLS = typeof(LISTCALLS === "object");
    expect(typeLISTCALLS).toBeTruthy();
  });
  test("Initialization LISTCALLS. Push { SUBSCRIBER: empty Array } in LISTCALLS", () => {
    const input = {
      LISTCALLS: new Map(),
      key: 'number phone Subscriber',
      value: [],
    }
    const output = input.LISTCALLS;
    expect(init(input.key, input.LISTCALLS)).toEqual(output);
  });
  test("Return LISTCALLS. LISTCALLS instanceof Map", () => {
    expect(getListCalls()).toEqual(new Map());
  })
  test("Update LISTCALLS. Functions updateListCalls and fetchListCalls work", async () => {
    const json = await updateListCalls(fetchListCalls, SUBSCRIBER)
    expect(json.has("{{phone}}")).toEqual(true)
    expect(Array.isArray(json.get("{{phone}}"))).toEqual(true)
    expect(json.get("{{phone}}").length).toEqual(0)
  })
  describe("CreateCall work. Push Call in LISTCALLS. Map (1) { SUBSCRIBER: [ Call ] }", () => {
    const getHelpMessage = () => {};
    const { date, time, message } = {
      date: { value: "01.01.2023" },
      time: { value: "10:10" },
      message: { value: "Your message" }
    }
    const SUBSCRIBER = "{{phone}}";

    test("Function formatter work", () => {
      const output = new Date(2023, 0, 1, 10, 10).getTime()
      expect(createCall().formatter(date, time)).toEqual(output)
    })
    test("Function validation work", () => {
      expect(createCall().validation(date, time, message)).toEqual(true);
    })
    test('Functions createCall and fetchCreateCall work', async () => {
      const json = await createCall(getHelpMessage, fetchCreateCall, fetchListCalls, date, time, message, SUBSCRIBER).create();
      expect(json).toEqual(true)
    });
  })
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
    expect(updateText(input, elementTitle)).toEqual("Это текст для тестирования функции updateTitle");
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
    expect(updateText(input, elementDescription)).toEqual("Это текст для тестирования функции updateDescription");
  })
});

// Test FirstScreen Component 
// See /public/core/components/card/first-screen
const elementFirstScreenClass = ".widget-first-screen-unique-class";
const elementFirstScreen = page.window.document.querySelector(elementFirstScreenClass);
const elementDateId = "widget-date-unique-id";
const elementDate = page.window.document.getElementById(elementDateId);
const elementTimeId = "widget-time-unique-id";
const elementTime = page.window.document.getElementById(elementTimeId);
const elementVoiceMessageId = "widget-voice-message-unique-id";
const elementVoiceMessage = page.window.document.getElementById(elementVoiceMessageId);

describe("FirstScreen Component", () => {
  test("Element first screen width class '.widget-first-screen-unique-class' exists in the index.html", () => {
    const bool = elementFirstScreen;
    expect(bool).toBeTruthy();
  });
  test("Element date width id 'widget-date-unique-id' exists in the index.html", () => {
    const bool = elementDate;
    expect(bool).toBeTruthy();
  });
  test("Element time width id 'widget-time-unique-id' exists in the index.html", () => {
    const bool = elementTime;
    expect(bool).toBeTruthy();
  });
  test("Element voice message width id 'widget-voice-message-unique-id' exists in the index.html", () => {
    const bool = elementVoiceMessage;
    expect(bool).toBeTruthy();
  });
});

// This is the function we'll be testing
async function withFetch() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const json = await res.json()

  return json
}

// Test SecondtScreen Component 
// See /public/core/components/card/first-screen