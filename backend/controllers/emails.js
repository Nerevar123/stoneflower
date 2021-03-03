const nodemailer = require('nodemailer');
const Email = require('../models/email');

module.exports.sendMail = (req, res, next) => {
  const { GMAIL_ADDRESS, GMAIL_PASSWORD } = process.env;
  const {
    name, tel, email, description,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_ADDRESS,
      pass: GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Stone Flower" <stoneflower@gmail.com>',
    to: 'nerevar123@gmail.com',
    subject: 'Каменный цветок',
    text: (name, tel, email, description),
    html: `<p>Name: ${name}</p>
    <p>tel: ${tel}</p>
    <p> email: ${email}</p>
    <p>description: ${description}</p>`,
  };

  Email.create({
    name, tel, email, description,
  })
    .then((mail) => {
      transporter
        .sendMail(mailOptions)
        .then((info) => {
          console.log(`Email sent: ${info.response}`);
          res.status(201).send(mail);
        })
        .catch(next);
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
