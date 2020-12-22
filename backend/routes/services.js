const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getServices, createService,
} = require('../controllers/services');

router.get('/', getServices);
router.post('/', celebrate({
  body: Joi.object().keys({
    heading: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    // link: Joi.string().required().pattern(/https?:\/\/(www\.)?[\w-]+(\.[a-z]+)[\w-._~:/?#@!$&'()*+,;=%]*#?/),
  }).unknown(true),
}), createService);
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
