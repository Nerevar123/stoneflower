const router = require('express').Router();
const serviceRouter = require('./services');
const emailRouter = require('./emails');
const textRouter = require('./texts');
const adviceRouter = require('./advices');
const imageRouter = require('./images');
const supplierRouter = require('./suppliers');
const surfaceRouter = require('./surfaces');

// const { register, login, logout } = require('../controllers/users');
// const auth = require('../middlewares/auth');
const { notFoundErrorMessage } = require('../utils/constants');

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

// router.use(auth);

router.use('/email', emailRouter);
router.use('/services', serviceRouter);
router.use('/texts', textRouter);
router.use('/advices', adviceRouter);
router.use('/images', imageRouter);
router.use('/suppliers', supplierRouter);
router.use('/surfaces', surfaceRouter);

// router.use('/logout', logout);

router.use('*', (req, res) => {
  res.status(404).send({ message: notFoundErrorMessage });
});

module.exports = router;
