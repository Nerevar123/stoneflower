const loginOkMessage = 'Вы успешно вошли в аккаунт';
const logoutOkMessage = 'Вы успешно вышли из аккаунта';
const notFoundErrorMessage = 'Запрашиваемый ресурс не найден';
const unauthorizedErrorMessage = 'Необходима авторизация';
const authorizedErrorMessage = 'Неправильные почта или пароль';
const credentialsErrorMessage = 'Необходимо ввести пароль';
const validationErrorMessage = 'Переданы некорректные данные';
const validationImageErrorMessage = 'Необходимо прикрепить изображение';
const validationFileErrorMessage = 'Недопустимый формат файла. Загрузите файл в формате png, jpeg или jpg';
const validationFilePdfErrorMessage = 'Недопустимый формат файла. Загрузите файл в формате pdf, png, jpeg или jpg';
const validationSizeErrorMessage = 'Слишком большой файл. Максимальный размер: 2мб';
const duplicateErrorMessage = 'Введенные данные уже есть в базе';
const serverErrorMessage = 'На сервере произошла ошибка';
const rateLimitErrorMessage = 'Превышен лимит запросов, повторите попытку позже';

module.exports = {
  loginOkMessage,
  logoutOkMessage,
  notFoundErrorMessage,
  unauthorizedErrorMessage,
  authorizedErrorMessage,
  credentialsErrorMessage,
  validationErrorMessage,
  validationImageErrorMessage,
  validationFileErrorMessage,
  validationFilePdfErrorMessage,
  validationSizeErrorMessage,
  duplicateErrorMessage,
  serverErrorMessage,
  rateLimitErrorMessage,
};
