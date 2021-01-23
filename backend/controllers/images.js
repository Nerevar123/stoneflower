const fs = require("fs");
const Image = require("../models/image");
const validationError = require("../errors/validation-error");

module.exports.getImages = (req, res, next) => {
  Image.find({})
    .then((images) => {
      let result = {};
      images.map((image) => {
        const formatImage = { [image.name]: {path: image.image.path, id: image._id }};
        result = { ...result, ...formatImage };
      });

      res.send(result);
    })
    .catch(next);
};

module.exports.saveImage = (req, res, next) => {
  const { name } = req.body;
  const image = req.file;

  Image.create({ name, image })
    .then((image) => res.status(201).send(image))
    .catch(next);
};

module.exports.deleteImage = (req, res, next) => {
  Image.findById(req.params.imageId)
    .orFail(new Error("notFound"))
    .then((data) => {
      try {
        fs.unlinkSync(data.image.path);
      } catch {
        next(new Error("notFound"));
      }
      Image.findByIdAndRemove(req.params.imageId).then((image) =>
        res.send(image)
      );
    })
    .catch(next);
};

module.exports.updateImage = (req, res, next) => {
  const { name } = req.body;
  const image = req.file;
  if (!image) throw new validationError("Необходимо прикрепить изображение");

  Image.findById(req.params.imageId)
    .orFail(new Error("notFound"))
    .then((data) => {
      if (!data) throw new Error("notFound");
      try {
        fs.unlinkSync(data.image.path);
      } catch {
        throw new Error("notFound");
      }
      Image.findByIdAndUpdate(
        req.params.imageId,
        { name, image },
        {
          new: true,
          runValidators: true,
        }
      )
        .orFail(new Error("notFound"))
        .then((image) => {
          const formatImage = { [image.name]: {path: image.image.path, id: image._id }};
          res.send(formatImage);
        });
    })
    .catch(next);
};
