const Surface = require('../models/surface');
const NotFoundError = require('../errors/not-found-error');
const { notFoundErrorMessage } = require('../utils/constants');

module.exports.getSurfaces = (req, res, next) => {
  Surface.find({})
    .then((surfaces) => {
      let result = {};
      surfaces.map((surface) => {
        let examples = {};
        surface.examples.map((item) => {
          examples = {
            ...examples,
            ...{
              id: item._id,
              description: item.description,
              manufacturer: item.manufacturer,
              origin: item.origin,
              style: item.style,
              surface: item.surface,
              image: item.image,
            },
          };
          return examples;
        });
        result = { ...result, ...{ [surface.title]: examples } };
        return result;
      });
      res.send(result);
    })
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

module.exports.updateSurface = (req, res, next) => {
  const { title, examples } = req.body;

  Surface.findByIdAndUpdate(
    req.params.surfaceId,
    { title, examples },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((surface) => {
      let content = {};
      surface.examples.map((item) => {
        content = {
          ...content,
          ...{
            id: item._id,
            description: item.description,
            manufacturer: item.manufacturer,
            origin: item.origin,
            style: item.style,
            surface: item.surface,
            image: item.image,
          },
        };
        return content;
      });
      res.send(content);
    })
    .catch(next);
};
