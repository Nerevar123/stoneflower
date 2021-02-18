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

  // transporter.sendMail(mailOptions)
  //   .then((info) => {
  //     console.log('Email sent: ' + info.response);

  //     Email.create({ name, tel, email, description })
  //       .then((email) => res.status(201).send(email))
  //       .catch(next);
  //   })
  //   .catch(next);
  // if (error) {
  // console.log(error);
  // } else {
  //   console.log('Email sent: ' + info.response);
  // }
  // })
  // .then((email) => res.send(email))
  // .catch(next);
  // console.log(nodemailer)
  // const { heading, description } = req.body;
  // const image = req.file;

  // Service.create({ heading, description, image })
  //   .then((service) => res.status(201).send(service))
  // .catch(next);
};

module.exports.deleteEmail = (req, res, next) => {
  Email.findByIdAndRemove(req.params.cardId)
    .then((email) => res.send(email))
    .catch(next);
};
