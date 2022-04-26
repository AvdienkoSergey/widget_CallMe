const Express = require("express");
const Cors = require("cors");
const Morgan = require("morgan");
const Http = require("http");
const Engine = require("consolidate");
const BodyParser = require('body-parser');

// Инициализация приложения
const App = Express();
// Логирование
App.use(Morgan("dev"));
// Защита на уровне домена
App.use(Cors());
// Парсер запросов
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));

App.set("views", __dirname + "/public");
App.engine("html", Engine.mustache);
App.set("view engine", "html");

App.use("/public", Express.static(__dirname + "/public"));

App.get("/", (req, res) => {
  const { phone } = req.query;
  res.render("widget/index", { phone });
})

App.get("/demo", (req, res) => {
  res.render("demo/index", { title: "Демо виджета" });
})

const { routes } = require("./routes");

// Роуты
routes.forEach((item) => {
  App.use(`/api/${item}`, require(`./routes/${item}`));
});

// Запуск сервера
const PORT = 3000;
Http.createServer({}, App).listen(process.env.PORT || PORT);
console.log(`Сервер запущен ${PORT}`);
