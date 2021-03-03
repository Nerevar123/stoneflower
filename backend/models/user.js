const mongoose = require('mongoose');
const validator = require('validator');
const { cryptCompare } = require('../utils/crypt');
const UnauthorizedError = require('../errors/not-authorized-error');
const { authorizedErrorMessage } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Необходимо ввести email'],
    unique: [true, 'Пользователь с такой почтой уже зарегестрирован'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Необходимо ввести пароль'],
    minlength: [8, 'Минимальная длина пароля - 4 символа'],
    select: false,
    validate: {
      validator: (v) => /^\S+$/.test(v),
      message: 'Недопустимый символ в пароле',
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError(authorizedErrorMessage))
    .then((user) => cryptCompare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(authorizedErrorMessage);
        }

        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
