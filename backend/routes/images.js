const router = require('express').Router();
// const path = require('path');
const { celebrate, Joi } = require('celebrate');
const multer = require('multer');
const {
  getImages,
  saveImage,
  deleteImage,
  updateImage,
} = require('../controllers/images');
const auth = require('../middlewares/auth');
const ValidationError = require('../errors/validation-error');
const { validationFilePdfErrorMessage } = require('../utils/constants');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads');
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
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
      return cb(new ValidationError(validationFilePdfErrorMessage));
    }
    return cb(undefined, true);
  },
}).single('image');

router.get('/', getImages);

router.use(auth);

router.post('/', upload, saveImage);
router.delete(
  '/:imageId',
  celebrate({
    params: Joi.object().keys({
      imageId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteImage,
);
router.patch(
  '/:imageId',
  upload,
  celebrate({
    params: Joi.object().keys({
      imageId: Joi.string().alphanum().length(24),
    }),
  }),
  updateImage,
);

module.exports = router;
