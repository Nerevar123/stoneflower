const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const multer = require('multer');
const {
  getAdvices,
  createAdvice,
  deleteAdvice,
  updateAdvice,
} = require('../controllers/advices');
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/advices');
  },
  filename(req, file, callback) {
    callback(null, Date.now() + file.originalname.replace(/[^A-z0-9.]/g, ''));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('please upload png,jpeg or jpg'));
    }
    return cb(undefined, true);
  },
}).single('image');

router.get('/', getAdvices);

router.use(auth);

router.post('/', upload, createAdvice);
router.delete(
  '/:adviceId',
  celebrate({
    params: Joi.object().keys({
      adviceId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteAdvice,
);
router.patch('/:adviceId', upload, updateAdvice);

module.exports = router;
