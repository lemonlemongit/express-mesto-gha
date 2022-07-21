const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { NOT_FOUND } = require("./errors.js");
// импортируем роутеры
const routUsers = require("./routes/users.js");
const routcards = require("./routes/cards.js");
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "62d976bd348bf0b7d1bf5233",
  };
  next();
});

app.use(express.json());
app.use("/", routUsers);
app.use("/", routcards);
app.use((req, res) => {
  res.status(NOT_FOUND).send({
    message:
      "карточка или пользователь не найден или был запрошен несуществующий роут",
  });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`Приложение слушает порт localhost:${PORT}`);
});
