const Text = require("../models/text");
const NotFoundError = require("../errors/not-found-error");
const { notFoundPageErrorMessage } = require("../utils/constants");

module.exports.getTexts = (req, res, next) => {
  Text.find({})
    .then((texts) => {
      let result = {};
      texts.map((text) => {
        let w = {};
        const content = text.content.map((item) => {
          w = { ...w, ...{ [item.name]: item.text } };
        });
        result = { ...result, ...{ [text.title]: w } };
      });
      res.send(result);
    })
    .catch(next);
};

module.exports.saveText = (req, res, next) => {
  const { title, content } = req.body;

  Text.create({ title, content })
    .then((text) => res.status(201).send(text))
    .catch(next);
};

module.exports.deleteText = (req, res, next) => {
  Text.findById(req.params.id)
    .orFail(new NotFoundError(notFoundPageErrorMessage))
    .then((data) => {
      Text.findByIdAndRemove(req.params.id).then((text) => res.send(text));
    })
    .catch(next);
};

module.exports.updateText = (req, res, next) => {
  const { title, text } = req.body;

  Text.findByIdAndUpdate(
    req.text._id,
    { title, text },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new Error("userNotFound"))
    .then((text) => res.send(text))
    .catch(next);
};
