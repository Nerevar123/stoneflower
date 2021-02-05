const router = require("express").Router();
// const path = require('path');
const { celebrate, Joi } = require("celebrate");
const multer = require("multer");
const {
  getServices,
  createService,
  deleteService,
  updateService,
} = require("../controllers/services");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/services");
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString().slice(0, 10) + file.originalname);
  },
});

const upload = multer({
  // dest: 'uploads/',
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

router.get("/", getServices);
router.post(
  "/",
  upload,
  celebrate({
    body: Joi.object()
      .keys({
        heading: Joi.string().min(2).required(),
        description: Joi.string().min(2).required(),
      })
      .unknown(true),
  }),
  createService
);
router.delete(
  "/:serviceId",
  celebrate({
    params: Joi.object().keys({
      serviceId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteService
);
router.patch("/:serviceId", upload, updateService);

module.exports = router;
