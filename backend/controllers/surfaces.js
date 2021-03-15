const fs = require('fs');
const Surface = require('../models/surface');
const NotFoundError = require('../errors/not-found-error');
const { notFoundErrorMessage } = require('../utils/constants');
const { logger } = require('../middlewares/logger');

module.exports.getSurfaces = (req, res, next) => {
  Surface.find({})
    .then((surfaces) => res.send(surfaces))
    .catch(next);
};

module.exports.saveSurface = (req, res, next) => {
  const { title, examples } = req.body;

  Surface.create({ title, examples })
    .then((surface) => res.status(201).send(surface))
    .catch(next);
};

module.exports.deleteSurface = (req, res, next) => {
  Surface.findById(req.params.surfaceId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then(() => {
      Surface.findByIdAndRemove(req.params.surfaceId).then((surface) => res.send(surface));
    })
    .catch(next);
};

module.exports.updateSurfaceExample = async (req, res, next) => {
  const {
    id,
    description,
    manufacturer,
    origin,
    style,
    surface,
  } = req.body;
  let image = req.file;
  let newFile = true;

  if (!image) {
    image = JSON.parse(req.body.image);
    newFile = false;
  }

  try {
    const selected = await Surface.findById(req.params.surfaceId);
    const foundIndex = selected.examples.findIndex((x) => x._id.toString() === id);
    if (foundIndex === -1) throw new NotFoundError(notFoundErrorMessage);
    if (newFile) {
      try {
        fs.unlinkSync(selected.examples[foundIndex].image.path);
      } catch {
        logger.error(`Ошибка при удалении: ${JSON.stringify(selected.examples[foundIndex].image)}`);
      }
    }

    selected.examples[foundIndex] = {
      _id: id,
      description,
      manufacturer,
      origin,
      style,
      surface,
      image,
    };
    const updated = await selected.save();

    res.send(updated);
  } catch (err) {
    next(err);
  }
};

module.exports.putSurfaceExamples = (req, res, next) => {
  const {
    description, manufacturer, origin, style, surface,
  } = req.body;
  const image = req.file;

  Surface.findByIdAndUpdate(
    req.params.surfaceId,
    {
      $addToSet: {
        examples: {
          description,
          manufacturer,
          origin,
          style,
          surface,
          image,
        },
      },
    },
    { new: true },
  )
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((examples) => res.send(examples))
    .catch(next);
};

module.exports.deleteSurfaceExamples = (req, res, next) => {
  const { example, image } = req.body;

  try {
    fs.unlinkSync(image.path);
  } catch {
    logger.error(`Ошибка при удалении: ${JSON.stringify(image)}`);
  }

  Surface.findByIdAndUpdate(
    req.params.surfaceId,
    {
      $pull: {
        examples: { _id: example },
      },
    },
    { new: true },
  )
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((examples) => res.send(examples))
    .catch(next);
};
