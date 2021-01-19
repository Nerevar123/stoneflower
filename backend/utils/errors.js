// const bcrypt = require('bcryptjs');

// const ERROR_CODE_400 = 400;
// const ERROR_CODE_401 = 401;
// const ERROR_CODE_403 = 403;
// const ERROR_CODE_404 = 404;
// const ERROR_CODE_409 = 409;
// const ERROR_CODE_500 = 500;

// const errorMessage400 = 'Переданы некорректные данные';
// const errorMessage401 = 'Неправильные почта или пароль';
// const errorMessageWithToken401 = 'Необходима авторизация';
// const errorMessage403 = 'Недостаточно прав для совершения операции';
// const errorMessage404 = 'Запрашиваемый ресурс не найден';
// const errorMessageWithCard404 = 'Запрашиваемая карточка не найдена';
// const errorMessageWithUser404 = 'Пользователь не найден';
// const errorMessage409 = 'Введенный вами адрес электронной почты уже зарегистрирован';
// const errorMessage500 = 'На сервере произошла ошибка';

// const checkError = (err, res) => {
//   console.log(err.name, err.message);
//   if (err.name === 'MulterError' || err.message === 'please upload png,jpeg or jpg' || err.name === 'ValidationError') {
//     res.status(ERROR_CODE_400).send({ message: errorMessage400, details: err.message });
//   } else if (err.message.startsWith('Invalid login')) {
//     res.status(ERROR_CODE_401).send({ message: errorMessage401 });
//   } else if (err.message === 'notFound') {
//     res.status(ERROR_CODE_404).send({ message: errorMessage404 });
//   } else {
//     res.status(ERROR_CODE_500).send({ message: errorMessage500, details: err.message });
//   }
// };

// module.exports = {
//   ERROR_CODE_404, errorMessage404, checkError,
// };
