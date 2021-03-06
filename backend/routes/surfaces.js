const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const multer = require('multer');
const {
  getSurfaces,
  saveSurface,
  deleteSurface,
  updateSurfaceExample,
  putSurfaceExamples,
  deleteSurfaceExamples,
} = require('../controllers/surfaces');
const auth = require('../middlewares/auth');
const ValidationError = require('../errors/validation-error');
const { validationFileErrorMessage } = require('../utils/constants');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/surfaces');
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

router.get('/', getSurfaces);

router.use(auth);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().min(2).required(),
      examples: Joi.array().required(),
    }),
  }),
  saveSurface,
);
router.delete(
  '/:surfaceId',
  celebrate({
    params: Joi.object().keys({
      surfaceId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteSurface,
);
router.patch(
  '/:surfaceId/examples', upload,
  celebrate({
    params: Joi.object().keys({
      surfaceId: Joi.string().alphanum().length(24),
    }),
  }),
  updateSurfaceExample,
);
router.put('/:surfaceId/examples', upload, celebrate({
  params: Joi.object().keys({
    surfaceId: Joi.string().alphanum().length(24),
  }),
}), putSurfaceExamples);
router.delete('/:surfaceId/examples', celebrate({
  params: Joi.object().keys({
    surfaceId: Joi.string().alphanum().length(24),
  }),
}), deleteSurfaceExamples);

module.exports = router;
