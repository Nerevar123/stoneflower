const Text = require('../models/text');
const NotFoundError = require('../errors/not-found-error');
const { notFoundErrorMessage } = require('../utils/constants');

module.exports.getTexts = (req, res, next) => {
  Text.find({})
    .then((texts) => {
      let result = {};
      texts.map((text) => {
        let content = {};
        text.content.map((item) => {
          content = { ...content, ...{ [item.name]: item.text, id: text._id } };
          return content;
        });
        result = { ...result, ...{ [text.title]: content } };
        return result;
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
  Text.findById(req.params.textId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then(() => {
      Text.findByIdAndRemove(req.params.textId).then((text) => res.send(text));
    })
    .catch(next);
};

module.exports.updateText = (req, res, next) => {
  const { title, content } = req.body;

  Text.findByIdAndUpdate(
    req.params.textId,
    { title, content },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((text) => {
      let contentSingle = {};
      text.content.map((item) => {
        contentSingle = { ...contentSingle, ...{ [item.name]: item.text, id: text._id } };
        return contentSingle;
      });
      res.send(contentSingle);
    })
    .catch(next);
};
