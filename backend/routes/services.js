const router = require('express').Router();
// const path = require('path');
const { celebrate, Joi } = require('celebrate');
const multer = require('multer');
const {
  getServices,
  createService,
  deleteService,
  updateService,
} = require('../controllers/services');
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/services');
  },
  filename(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  // dest: 'uploads/',
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

router.get('/', getServices);

router.use(auth);

router.post(
  '/',
  upload,
  celebrate({
    body: Joi.object()
      .keys({
        heading: Joi.string().min(2).required(),
        description: Joi.string().min(2).required(),
      })
      .unknown(true),
  }),
  createService,
);
router.delete(
  '/:serviceId',
  celebrate({
    params: Joi.object().keys({
      serviceId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteService,
);
router.patch('/:serviceId', upload, updateService);

module.exports = router;
