const router = require("express").Router();
// const path = require('path');
const { celebrate, Joi } = require("celebrate");
const multer = require("multer");
const {
  getImages,
  saveImage,
  deleteImage,
  updateImage,
} = require("../controllers/images");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
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
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
      return cb(new Error("please upload png,jpeg or jpg"));
    }
    cb(undefined, true);
  },
}).single("image");

router.get("/", getImages);
router.post("/", upload, saveImage);
router.delete(
  "/:imageId",
  celebrate({
    params: Joi.object().keys({
      imageId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteImage
);
router.patch(
  "/:imageId",
  upload,
  celebrate({
    params: Joi.object().keys({
      imageId: Joi.string().alphanum().length(24),
    }),
  }),
  updateImage
);

module.exports = router;
