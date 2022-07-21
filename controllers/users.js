const User = require("../models/user");
const {OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../errors.js');
//создаёт пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((error) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${error}` });
    });
};

//возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(OK).send({ data: users });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(NOT_FOUND).send({ message: "Пользователь не найден" });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${error}` });
    });
};

//возвращает пользователя по _id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: "Пользователь не найден" });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.path === "_id") {
        res.status(BAD_REQUEST).send({ message: "Пользователь c таким id не найден" });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${error}` });
      }
    });
};

//обновляет профиль
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    { _id: userId },
    { name, about },
    { new: true, runValidators: true, upsert: false }
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: "Пользователь не найден" });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.path === "_id") {
        res.status(BAD_REQUEST).send({
          message: `Переданы некорректные данные идентификатора: ${err}`,
        });
      } else if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${error}` });
      }
    });
};

//обновляет аватар пользователя
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    { _id: userId },
    { avatar },
    { new: true, runValidators: true, upsert: false }
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: "Пользователь не найден" });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.path === "_id") {
        res.status(BAD_REQUEST).send({
          message: `Переданы некорректные данные идентификатора: ${err}`,
        });
      } else if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${error}` });
      }
    });
};
