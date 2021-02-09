const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const multer = require("multer");
const {
  getAdvices,
  createAdvice,
  deleteAdvice,
  updateAdvice,
} = require("../controllers/advices");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/advices");
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString().slice(0, 10) + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("please upload png,jpeg or jpg"));
    }
    cb(undefined, true);
  },
}).single("image");

router.get("/", getAdvices);
router.post(
  "/",
  upload,
  celebrate({
    body: Joi.object()
      .keys({
        heading: Joi.string().min(2).required(),
        shortText: Joi.string().min(2).required(),
        expandedText: Joi.string().min(2).required(),
      })
      .unknown(true),
  }),
  createAdvice
);
router.delete(
  "/:adviceId",
  celebrate({
    params: Joi.object().keys({
      adviceId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteAdvice
);
router.patch("/:adviceId", upload, updateAdvice);

module.exports = router;
