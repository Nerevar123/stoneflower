const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const multer  = require('multer');
const {
  getServices, createService,
} = require('../controllers/services');

// const upload = multer({ dest: 'uploads/' });

// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function(req, file, cb){
//      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   dest: "/tmp",
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype == "text/csv" && file.fieldname === "test_doc") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Invalid upload: fieldname should be test_doc and .csv format '));
//     }
//   }
// });

const upload = multer({
  dest: 'uploads/',
  limits:{fileSize: 1000000},
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
