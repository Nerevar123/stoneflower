const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/not-authorized-error');
const { JWT_SECRET } = require('../config');
const { unauthorizedErrorMessage } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) throw new UnauthorizedError(unauthorizedErrorMessage);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};
