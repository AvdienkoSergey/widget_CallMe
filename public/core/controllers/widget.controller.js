const { request } = require("./fetch.controller");
// request --> from ./fetch.controller
const fetchListCalls = (subscriberPhone) => request({ url: `/${subscriberPhone}`, method: 'GET' });
const fetchCreateCall = (call) => request({ url: `/`, method: 'POST', data: call });

module.exports = {
  fetchListCalls,
  fetchCreateCall,
}