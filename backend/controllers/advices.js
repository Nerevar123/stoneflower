const fs = require("fs");
const Advice = require("../models/advice");
const validationError = require('../errors/validation-error');

module.exports.getAdvices = (req, res, next) => {
  Advice.find({})
    .then((advices) => res.send(advices))
    .catch(next);
};

module.exports.createAdvice = (req, res, next) => {
  const { heading, shortText, expandedText } = req.body;
  const image = req.file;

  Advice.create({ heading, shortText, expandedText, image })
    .then((advice) => res.status(201).send(advice))
    .catch(next);
};

module.exports.deleteAdvice = (req, res, next) => {
  Advice.findById(req.params.adviceId)
    .orFail(new Error("notFound"))
    .then((data) => {
      try {
        fs.unlinkSync(data.image.path);
      } catch {
        next(new Error("notFound"));
      }
      Advice.findByIdAndRemove(req.params.adviceId).then((advice) =>
        res.send(advice)
      );
    })
    .catch(next);
};

module.exports.updateAdvice = (req, res, next) => {
  const { heading, shortText, expandedText } = req.body;
  const image = req.file;
  if (!image) throw new validationError("Необходимо прикрепить изображение");

  Advice.findById(req.params.adviceId)
    .orFail(new Error("notFound"))
    .then((data) => {
      try {
        fs.unlinkSync(data.image.path);
      } catch {
        throw new Error("notFound");
      }
      Advice.findByIdAndUpdate(
        req.params.adviceId,
        { heading, shortText, expandedText, image },
        {
          new: true,
          runValidators: true,
        }
      )
        .orFail(new Error("notFound"))
        .then((advice) => res.send(advice));
    })
    .catch(next);
};
