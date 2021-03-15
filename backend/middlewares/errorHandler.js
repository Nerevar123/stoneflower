const multer = require('multer');
const {
  duplicateErrorMessage, serverErrorMessage, validationErrorMessage, validationSizeErrorMessage,
} = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).send({ message: validationErrorMessage, details: err.message });
    return;
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(409).send({ message: duplicateErrorMessage, details: err.message });
    return;
  }

  if (err instanceof multer.MulterError) {
    res.status(413).send({ message: validationSizeErrorMessage, details: err.message });
  }

  // eslint-disable-next-line max-len
  res.status(statusCode).send({ message: statusCode === 500 ? serverErrorMessage : message, details: err.message });

  next();
});
