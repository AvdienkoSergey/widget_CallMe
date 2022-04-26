// request --> from ./fetch.controller

const getListCalls = (subscriberPhone) => request({ url: `/${subscriberPhone}`, method: 'GET' });
const getNewCall = (call) => request({ url: `/`, method: 'POST', data: call });
