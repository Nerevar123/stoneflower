const router = require('express').Router();
// const path = require('path');
const { celebrate, Joi } = require('celebrate');
const multer  = require('multer');
const {
  getServices, createService,
} = require('../controllers/services');

// const storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, './uploads');
//   },
//   filename: function (req, file, callback) {
//     callback(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// });

var storage = multer.diskStorage({
  destination: function(req, file, callback){
      callback(null, "./uploads");
  },
  filename: function(req, file, callback){
      callback(null, Date.now() + file.originalname);
  }
});

const upload = multer({
  // dest: 'uploads/',
  storage : storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("please upload png,jpeg or jpg"));
    }
    cb(undefined, true);
  }
}).single("image");

router.get('/', getServices);
router.post('/', upload, celebrate({
  body: Joi.object().keys({
    heading: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    // image: Joi.binary().encoding('base64').max(2 * 1024 * 1024).required(),
  }).unknown(true),
}), createService);

// router.post('/', upload, createService);

// router.delete('/:cardId', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().alphanum().length(24),
//   }),
// }), deleteCard);
// router.put('/:cardId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().alphanum().length(24),
//   }),
// }), putLike);
// router.delete('/:cardId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().alphanum().length(24),
//   }),
// }), deleteLike);

module.exports = router;
