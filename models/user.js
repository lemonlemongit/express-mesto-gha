const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // у пользователя есть требования в схеме:
  name: {
    type: String, // имя — это строка
    required: true,// оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model("user", userSchema);
