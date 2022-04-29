const Express = require("express");
const Cors = require("cors");
const Morgan = require("morgan");
const Http = require("http");
const Engine = require("consolidate");
const BodyParser = require('body-parser');

const fs = require('fs');
const path = require('path')

const notes = __dirname + "/public/widget/index.html";
console.log(path.dirname(notes)); // /users/flavio
console.log(path.basename(notes)) // notes.txt
console.log(path.extname(notes))// .txt

fs.readFile(path.dirname(notes) + '/' + path.basename(notes), "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  
  const indexAJs = data.indexOf('<script defer src="')
  const indexBJs = data.indexOf('<link href="')
  const indexACss = indexBJs;
  const indexBCss = data.indexOf('</head><body class="body">');

  const src = {
    js: data.substring(indexAJs, indexBJs),
    css: data.substring(indexACss, indexBCss)
  }

  // if (src.js.indexOf('/public/widget/')) return;
  // if (src.css.indexOf('/public/widget/')) return;

  const newSrc = {
    js: (() => {
      const arr = src.js.split('"');
      arr[1] = '"/public/widget/' + arr[1] + '"';
      let str = '';
      arr.forEach(element => {
        str += element;
      });
      return str;
    })(),
    css: (() => {
      const arr = src.css.split('"');
      arr[1] = '"/public/widget/' + arr[1] + '"';
      let str = '';
      arr.forEach(element => {
        str += element;
      });
      return str;
    })(),
  }

  let newData = '';
  newData = data.replace(src.js, newSrc.js).replace(src.css, newSrc.css);

  fs.writeFileSync(path.dirname(notes) + '/' + path.basename(notes), newData)
})


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
