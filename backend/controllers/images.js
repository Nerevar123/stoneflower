const fs = require('fs');
const Image = require('../models/image');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');
const { notFoundErrorMessage, validationImageErrorMessage } = require('../utils/constants');
const { logger } = require('../middlewares/logger');

module.exports.getImages = (req, res, next) => {
  Image.find({})
    .then((images) => {
      let result = {};
      images.map((image) => {
        const formatImage = { [image.name]: { path: image.image.path, id: image._id } };
        result = { ...result, ...formatImage };
        return result;
      });

      res.send(result);
    })
    .catch(next);
};

module.exports.saveImage = (req, res, next) => {
  const { name } = req.body;
  const image = req.file;

  Image.create({ name, image })
    .then((data) => res.status(201).send(data))
    .catch(next);
};

module.exports.deleteImage = (req, res, next) => {
  Image.findById(req.params.imageId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((data) => {
      try {
        fs.unlinkSync(data.image.path);
      } catch {
        logger.error(`Ошибка при удалении: ${JSON.stringify(data.image)}`);
      }
      Image.findByIdAndRemove(req.params.imageId).then((image) => res.send(image));
    })
    .catch(next);
};

module.exports.updateImage = (req, res, next) => {
  const { name } = req.body;
  const image = req.file;
  if (!image) throw new ValidationError(validationImageErrorMessage);

  Image.findById(req.params.imageId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((data) => {
      if (!data) throw new NotFoundError(notFoundErrorMessage);
      try {
        fs.unlinkSync(data.image.path);
      } catch {
        logger.error(`Ошибка при удалении: ${JSON.stringify(data.image)}`);
      }
      Image.findByIdAndUpdate(
        req.params.imageId,
        { name, image },
        {
          new: true,
          runValidators: true,
        },
      )
        .orFail(new NotFoundError(notFoundErrorMessage))
        .then((result) => {
          const formatImage = { [result.name]: { path: result.image.path, id: result._id } };
          res.send(formatImage);
        });
    })
    .catch(next);
};
