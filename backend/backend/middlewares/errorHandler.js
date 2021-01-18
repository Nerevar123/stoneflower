const { duplicateErrorMessage, serverErrorMessage, validationErrorMessage } = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).send({ message: validationErrorMessage });
    return;
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(409).send({ message: duplicateErrorMessage });
    return;
  }

  res.status(statusCode).send({ message: statusCode === 500 ? serverErrorMessage : message });

  next();
});
