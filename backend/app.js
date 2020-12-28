require("dotenv-flow").config();
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
const routes = require("./routes");
// const multer  = require('multer');
const { celebrate, Joi, errors } = require("celebrate");
const {
  // ERROR_CODE_404,
  // errorMessage404,
  checkError,
} = require("./utils/errors");
// const {
//   createUser, login, logout, checkCookies,
// } = require('./controllers/users');
// const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/stoneflower" } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected-to-DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

app.use(requestLogger);

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

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

// app.use('/logout', logout);

app.use('/uploads', express.static('uploads'));
app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => checkError(err, res, next));

app.listen(PORT);
