const jwt = require('jsonwebtoken');
const yn = require('yn');
const User = require('../models/user');
// const { cryptHash } = require('../utils/crypt');
// const { registrationOkMessage, logoutOkMessage, loginOkMessage } = require('../utils/constants');
const { logoutOkMessage, loginOkMessage } = require('../utils/constants');
const { JWT_SECRET, COOKIES_SECURE, COOKIES_SAMESITE } = require('../config');

// module.exports.register = (req, res, next) => {
//   const { email, password } = req.body;

//   User.init()
//     .then(() => {
//       cryptHash(password)
//         .then((hash) => User.create({ email, password: hash }))
//         .then(() => res.status(201).send({ message: "Registration success" }))
//         .catch(next);
//     });
// };

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '30d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 30,
        sameSite: COOKIES_SAMESITE,
        secure: yn(COOKIES_SECURE),
        httpOnly: yn(COOKIES_SECURE),
      });
      res.send({ message: loginOkMessage });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      sameSite: COOKIES_SAMESITE,
      secure: yn(COOKIES_SECURE),
      httpOnly: yn(COOKIES_SECURE),
    });
    res.send({ message: logoutOkMessage });
  } catch (err) {
    next(err);
  }
};
