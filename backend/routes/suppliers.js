const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const multer = require("multer");
const {
  getSuppliers,
  createSupplier,
  deleteSupplier,
  updateSupplier,
} = require("../controllers/suppliers");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/suppliers");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
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

router.get("/", getSuppliers);
router.post("/", upload, createSupplier);
router.delete(
  "/:supplierId",
  celebrate({
    params: Joi.object().keys({
      supplierId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteSupplier
);
router.patch("/:supplierId", upload, updateSupplier);

module.exports = router;
