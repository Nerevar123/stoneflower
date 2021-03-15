const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const multer = require('multer');
const {
  getWorks,
  saveWork,
  patchWork,
  deleteWork,
  updateWorkPhoto,
  putWorkPhoto,
  deleteWorkPhoto,
} = require('../controllers/works');
const auth = require('../middlewares/auth');
const ValidationError = require('../errors/validation-error');
const { validationFileErrorMessage } = require('../utils/constants');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/portfolio');
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
      return cb(new ValidationError(validationFileErrorMessage));
    }
    return cb(undefined, true);
  },
}).single('image');

router.get('/', getWorks);

router.use(auth);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().min(2).required(),
      category: Joi.string().min(2).required(),
      text: Joi.string().min(2).required(),
      photos: Joi.array().required(),
    }),
  }),
  saveWork,
);
router.patch(
  '/:workId',
  celebrate({
    params: Joi.object().keys({
      workId: Joi.string().alphanum().length(24),
    }),
  }),
  patchWork,
);
router.delete(
  '/:workId',
  celebrate({
    params: Joi.object().keys({
      workId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteWork,
);
router.patch(
  '/:workId/photos', upload,
  celebrate({
    params: Joi.object().keys({
      workId: Joi.string().alphanum().length(24),
    }),
  }),
  updateWorkPhoto,
);
router.put('/:workId/photos', upload, celebrate({
  params: Joi.object().keys({
    workId: Joi.string().alphanum().length(24),
  }),
}), putWorkPhoto);
router.delete('/:workId/photos', celebrate({
  params: Joi.object().keys({
    workId: Joi.string().alphanum().length(24),
  }),
}), deleteWorkPhoto);

module.exports = router;
