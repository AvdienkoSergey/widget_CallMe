const LISTCALLS = new Map();
// - subscriber: [ Call ]

function init(SUBSCRIBER) {
  LISTCALLS.set(SUBSCRIBER.toString(), []);
  return LISTCALLS;
}

function testListCall() {
  console.log(LISTCALLS)
}

module.exports = {
  LISTCALLS,
  init,
  testListCall
}
