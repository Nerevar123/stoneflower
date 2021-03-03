const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { sendMail, deleteEmail, getEmails } = require('../controllers/emails');
const auth = require('../middlewares/auth');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).required(),
      tel: Joi.string().min(9).required(),
      email: Joi.string().email().required(),
      description: Joi.string().min(2).required(),
    }),
  }),
  sendMail,
);

router.use(auth);

router.get('/', getEmails);

router.delete(
  '/:mailId',
  celebrate({
    params: Joi.object().keys({
      mailId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteEmail,
);

module.exports = router;
