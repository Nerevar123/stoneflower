const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getSurfaces,
  saveSurface,
  deleteSurface,
  updateSurface,
} = require('../controllers/surfaces');

router.get('/', getSurfaces);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().min(2).required(),
      examples: Joi.array().required(),
    }),
  }),
  saveSurface,
);
router.delete(
  '/:surfaceId',
  celebrate({
    params: Joi.object().keys({
      surfaceId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteSurface,
);
router.patch(
  '/:surfaceId',
  celebrate({
    params: Joi.object().keys({
      surfaceId: Joi.string().alphanum().length(24),
    }),
    body: Joi.object().keys({
      title: Joi.string().min(2).required(),
      examples: Joi.array().required(),
    }),
  }),
  updateSurface,
);

module.exports = router;
