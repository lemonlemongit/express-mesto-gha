const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send({ message: `Ошибка серверочка ${error}` });
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId).then((user) => res.status(200).send(user));
};
