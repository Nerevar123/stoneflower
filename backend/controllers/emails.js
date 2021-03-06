const nodemailer = require('nodemailer');
const Email = require('../models/email');
const { logger } = require('../middlewares/logger');
const { serverErrorMessage } = require('../utils/constants');

module.exports.sendMail = (req, res, next) => {
  const { MAIL_ADDRESS, MAIL_PASSWORD, MAIL_TO } = process.env;
  const {
    name, tel, email, description,
  } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: '587',
    secure: false,
    auth: {
      user: MAIL_ADDRESS,
      pass: MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '<fioradipietra.web@yandex.ru>',
    to: MAIL_TO,
    subject: `Новая заявка, ${name}`,
    html: `<p>Имя отправителя: ${name}</p>
    <p>Телефон: ${tel}</p>
    <p>Email: ${email}</p>
    <p>Описание задачи: ${description}</p>`,
  };

  Email.create({
    name, tel, email, description,
  })
    .then((mail) => {
      transporter
        .sendMail(mailOptions)
        .then((info) => {
          logger.info(`Email sent: ${info.response}`);
          res.status(201).send(mail);
        })
        .catch((err) => {
          logger.error(`Email error: ${err}`);
          next(serverErrorMessage);
        });
    })
    .catch(next);
};

module.exports.getEmails = (req, res, next) => {
  Email.find({})
    .then((emails) => res.send(emails))
    .catch(next);
};

module.exports.deleteEmail = (req, res, next) => {
  Email.findByIdAndRemove(req.params.mailId)
    .then((email) => res.send(email))
    .catch(next);
};
