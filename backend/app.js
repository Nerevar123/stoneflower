require('dotenv-flow').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { ERROR_CODE_404, errorMessage404, checkError } = require('./utils/errors');
// const {
//   createUser, login, logout, checkCookies,
// } = require('./controllers/users');
// const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/stoneflower', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use(requestLogger);

// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(4).required().pattern(/^\S+$/),
//   }),
// }), login);
// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(4).required().pattern(/^\S+$/),
//   }).unknown(true),
// }), createUser);

// app.use(auth);

// app.get('/check', checkCookies);
// app.use('/users', require('./routes/users'));
app.use('/services', require('./routes/services'));

// app.use('/logout', logout);

app.use('*', (req, res) => {
  res.status(ERROR_CODE_404).send({ message: errorMessage404 });
});

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => checkError(err, res, next));

app.listen(PORT);
