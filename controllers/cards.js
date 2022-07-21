const Card = require('../models/card');

//контроллер создания карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // _id станет доступен

  Card.create({ name, link, owner })
    // вернём записанные в базу данные
    .then((card) =>  res.status(200).send({ card }))
    // данные не записались, вернём ошибку
    .catch((err) => next(err));
};

//контроллер возвращает все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => next(err));
};

//контроллер удаляет карточку по id
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));

};
