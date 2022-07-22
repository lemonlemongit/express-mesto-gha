const Card = require('../models/card');
const {
  OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR,
} = require('../errors.js');

// создания карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // _id станет доступен

  Card.create({
    name,
    link,
    owner,
  })
    // вернём записанные в базу данные
    .then((card) => res.status(OK).send({ card }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

// возвращает все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK).send({ data: cards }))
    .catch((err) => next(err));
};

// удаляет карточку по id
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res
          .status(BAD_REQUEST)
          .send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

// поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res
          .status(BAD_REQUEST)
          .send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

// убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res
          .status(BAD_REQUEST)
          .send({ message: `Переданы некорректные данные: ${err}` });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};
