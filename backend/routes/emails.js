const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { sendMail, deleteEmail } = require('../controllers/emails');
const auth = require('../middlewares/auth');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).required(),
      tel: Joi.string().min(9).pattern(/^[0-9]+$/).required(),
      email: Joi.string().email().required(),
      description: Joi.string().min(2).required(),
    }),
  }),
  sendMail,
);

router.use(auth);

router.delete(
  '/:emailId',
  celebrate({
    params: Joi.object().keys({
      emailId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteEmail,
);

module.exports = router;
