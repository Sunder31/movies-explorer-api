const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    default: 'Имя Пользователя',
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: [true, 'Пользователь с таким email уже существует'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(new UnauthorizedError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      } else {
        return user;
      }
    }));
};

module.exports = mongoose.model('user', userSchema);
