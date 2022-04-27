const API_URL = "http://localhost:3000/api/widget";

const request = async ({
  url,
  method,
  data = {}
}) => {

  let response = null;

  switch (method) {
    case "GET":
      try {
        response = await fetch(API_URL  + url, {
          method: method,
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        });
      } catch (error) {
        console.log(error)
      }
      break;

    case "POST":
      response = await fetch(API_URL + url, {
        method: method,
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data),
      });
  }

  return response;
};

module.exports = { request } 