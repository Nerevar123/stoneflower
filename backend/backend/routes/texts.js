const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getTexts,
  saveText,
  deleteText,
  updateText,
} = require("../controllers/texts");

router.get("/", getTexts);
router.post(
  "/",
  // celebrate({
  //   body: Joi.object().keys({
  //     title: Joi.string().min(2).required(),
  //     text: Joi.string().min(2).required(),
  //   }),
  // }),
  saveText
);
router.delete(
  "/:textId",
  celebrate({
    params: Joi.object().keys({
      textId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteText
);
router.patch(
  "/:textId",
  celebrate({
    params: Joi.object().keys({
      textId: Joi.string().alphanum().length(24),
    }),
    body: Joi.object().keys({
      title: Joi.string().min(2).required(),
      text: Joi.string().min(2).required(),
    }),
  }),
  updateText
);

module.exports = router;
