const router = require('express').Router();
const serviceRouter = require('./services');
const emailRouter = require('./emails');
const textRouter = require('./texts');
const adviceRouter = require('./advices');
const imageRouter = require('./images');
const supplierRouter = require('./suppliers');
const surfaceRouter = require('./surfaces');
const worksRouter = require('./works');

const {
  register, login, logout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { notFoundErrorMessage } = require('../utils/constants');

router.post('/signin', login);
router.post('/signup', register);

router.use('/email', emailRouter);
router.use('/services', serviceRouter);
router.use('/texts', textRouter);
router.use('/advices', adviceRouter);
router.use('/images', imageRouter);
router.use('/suppliers', supplierRouter);
router.use('/surfaces', surfaceRouter);
router.use('/works', worksRouter);

router.use(auth);

router.get('/logout', logout);

router.use('*', (req, res) => {
  res.status(404).send({ message: notFoundErrorMessage });
});

module.exports = router;
