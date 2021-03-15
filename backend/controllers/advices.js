const fs = require('fs');
const Advice = require('../models/advice');
const NotFoundError = require('../errors/not-found-error');
const { notFoundErrorMessage } = require('../utils/constants');
const { logger } = require('../middlewares/logger');

module.exports.getAdvices = (req, res, next) => {
  Advice.find({})
    .then((advices) => res.send(advices))
    .catch(next);
};

module.exports.createAdvice = (req, res, next) => {
  const { heading, shortText, expandedText } = req.body;
  const image = req.file;

  Advice.create({
    heading, shortText, expandedText, image,
  })
    .then((advice) => res.status(201).send(advice))
    .catch(next);
};

module.exports.deleteAdvice = (req, res, next) => {
  Advice.findById(req.params.adviceId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((data) => {
      try {
        fs.unlinkSync(data.image.path);
      } catch {
        logger.error(`Ошибка при удалении: ${JSON.stringify(data.image)}`);
      }
      Advice.findByIdAndRemove(req.params.adviceId).then((advice) => res.send(advice));
    })
    .catch(next);
};

module.exports.updateAdvice = (req, res, next) => {
  const { heading, shortText, expandedText } = req.body;
  let image = req.file;
  let newFile = true;

  if (!image) {
    image = JSON.parse(req.body.image);
    newFile = false;
  }

  Advice.findById(req.params.adviceId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((data) => {
      if (newFile) {
        try {
          fs.unlinkSync(data.image.path);
        } catch {
          logger.error(`Ошибка при удалении: ${JSON.stringify(data.image)}`);
        }
      }

      Advice.findByIdAndUpdate(
        req.params.adviceId,
        {
          heading, shortText, expandedText, image,
        },
        {
          new: true,
          runValidators: true,
        },
      )
        .orFail(new NotFoundError(notFoundErrorMessage))
        .then((advice) => res.send(advice));
    })
    .catch(next);
};
