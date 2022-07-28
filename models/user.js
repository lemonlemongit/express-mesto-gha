const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  // у пользователя есть требования в схеме:
  name: {
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Еmail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
