require("dotenv-flow").config();
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { errors } = require("celebrate");

const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require("./middlewares/logger");

const {
  PORT, MONGO_URL, rateLimitConfig, corsConfig,
} = require('./config');

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const limiter = rateLimit(rateLimitConfig);

app.use(cors(corsConfig));

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
app.use(errorHandler);

app.listen(PORT);
