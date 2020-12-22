// const bcrypt = require('bcryptjs');

const ERROR_CODE_400 = 400;
const ERROR_CODE_401 = 401;
const ERROR_CODE_403 = 403;
const ERROR_CODE_404 = 404;
const ERROR_CODE_409 = 409;
const ERROR_CODE_500 = 500;

const errorMessage400 = 'Переданы некорректные данные';
const errorMessage401 = 'Неправильные почта или пароль';
const errorMessageWithToken401 = 'Необходима авторизация';
const errorMessage403 = 'Недостаточно прав для совершения операции';
const errorMessage404 = 'Запрашиваемый ресурс не найден';
const errorMessageWithCard404 = 'Запрашиваемая карточка не найдена';
const errorMessageWithUser404 = 'Пользователь не найден';
const errorMessage409 = 'Введенный вами адрес электронной почты уже зарегистрирован';
const errorMessage500 = 'На сервере произошла ошибка';

const checkError = (err, res) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(ERROR_CODE_400).send({ message: errorMessage400, details: err.message });
  } else if (err.message === 'notValidLogin') {
    res.status(ERROR_CODE_401).send({ message: errorMessage401 });
  } else if (err.message === 'JsonWebTokenError' || err.name === 'JsonWebTokenError') {
    res.status(ERROR_CODE_401).send({ message: errorMessageWithToken401 });
  } else if (err.message === 'forbidden') {
    res.status(ERROR_CODE_403).send({ message: errorMessage403 });
  } else if (err.message === 'cardNotFound') {
    res.status(ERROR_CODE_404).send({ message: errorMessageWithCard404 });
  } else if (err.message === 'userNotFound') {
    res.status(ERROR_CODE_404).send({ message: errorMessageWithUser404 });
  } else if (err.name === 'MongoError' && (err.message.startsWith('E11000'))) {
    res.status(ERROR_CODE_409).send({ message: errorMessage409 });
  } else {
    res.status(ERROR_CODE_500).send({ message: errorMessage500, details: err.message });
  }
};

// function cryptHash(password) {
//   if (!password) {
//     return Promise.reject(new Error('notValidLogin'));
//   }

//   return bcrypt.hash(password, 10);
// }

// const cryptCompare = (password, hashedPassword) => {
//   if (!password || !hashedPassword) {
//     return Promise.reject(new Error('notValidLogin'));
//   }

//   return bcrypt.compare(password, hashedPassword);
// };

// module.exports = {
//   ERROR_CODE_404, errorMessage404, checkError, cryptCompare, cryptHash,
// };
module.exports = {
  ERROR_CODE_404, errorMessage404, checkError,
};
