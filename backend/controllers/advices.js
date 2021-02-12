const fs = require("fs");
const Advice = require("../models/advice");
const NotFoundError = require('../errors/not-found-error');
const { notFoundErrorMessage } = require('../utils/constants');

module.exports.getAdvices = (req, res, next) => {
  Advice.find({})
    .then((advices) => res.send(advices))
    .catch(next);
};

module.exports.createAdvice = (req, res, next) => {
  const { heading, shortText, expandedText } = req.body;
  let image = req.file;

  // if (!image) {
  //   image = JSON.parse(req.body.image);
  //   const filename = image.filename.slice(0, image.filename.length - 4) + 123 + image.filename.slice(image.filename.length - 4, image.filename.length);
  //   const path = image.path.slice(0, image.path.length - 4) + 123 + image.path.slice(image.path.length - 4, image.path.length);

  //   fs.copyFile(image.path, path, (err) => {
  //     if (err) throw err;
  //   });
  //   image.path = path;
  //   image.filename = filename;
  // }

  Advice.create({ heading, shortText, expandedText, image })
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
        // next(new NotFoundError(notFoundErrorMessage));
        console.log(data.image);
      }
      Advice.findByIdAndRemove(req.params.adviceId).then((advice) =>
        res.send(advice)
      );
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
          // throw new NotFoundError(notFoundErrorMessage);
          console.log(data.image);
        }
      }

      Advice.findByIdAndUpdate(
        req.params.adviceId,
        { heading, shortText, expandedText, image },
        {
          new: true,
          runValidators: true,
        }
      )
        .orFail(new NotFoundError(notFoundErrorMessage))
        .then((advice) => res.send(advice));
    })
    .catch(next);
};
