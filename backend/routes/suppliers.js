const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const multer = require('multer');
const {
  getSuppliers,
  createSupplier,
  deleteSupplier,
  updateSupplier,
} = require('../controllers/suppliers');
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/suppliers');
  },
  filename(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
      return cb(new Error('please upload png,jpeg or jpg'));
    }
    return cb(undefined, true);
  },
}).single('image');

router.get('/', getSuppliers);

router.use(auth);

router.post('/', upload, createSupplier);
router.delete(
  '/:supplierId',
  celebrate({
    params: Joi.object().keys({
      supplierId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteSupplier,
);
router.patch('/:supplierId', upload, updateSupplier);

module.exports = router;
