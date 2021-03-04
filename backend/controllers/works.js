const fs = require('fs');
const Work = require('../models/work');
const NotFoundError = require('../errors/not-found-error');
const { notFoundErrorMessage } = require('../utils/constants');

module.exports.getWorks = (req, res, next) => {
  Work.find({})
    .then((works) => res.send(works))
    .catch(next);
};

module.exports.saveWork = (req, res, next) => {
  const {
    title, category, text, photos,
  } = req.body;

  Work.create({
    title, category, text, photos,
  })
    .then((work) => res.status(201).send(work))
    .catch(next);
};

module.exports.deleteWork = (req, res, next) => {
  Work.findById(req.params.workId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then(() => {
      Work.findByIdAndRemove(req.params.workId).then((work) => res.send(work));
    })
    .catch(next);
};

module.exports.updateWorkPhoto = async (req, res, next) => {
  const { id, description } = req.body;
  let image = req.file;
  let newFile = true;

  if (!image) {
    image = JSON.parse(req.body.image);
    newFile = false;
  }

  try {
    const selected = await Work.findById(req.params.workId);
    const foundIndex = selected.photos.findIndex((x) => x._id.toString() === id);
    if (foundIndex === -1) throw new NotFoundError(notFoundErrorMessage);
    if (newFile) {
      try {
        fs.unlinkSync(selected.photos[foundIndex].image.path);
      } catch {
        console.log(`Изображение не найдено: ${selected.photos[foundIndex].image}`);
      }
    }

    selected.photos[foundIndex] = {
      _id: id,
      description,
      image,
    };
    const updated = await selected.save();

    res.send(updated);
  } catch (err) {
    next(err);
  }
};

module.exports.putWorkPhoto = (req, res, next) => {
  const { description } = req.body;
  const image = req.file;

  Work.findByIdAndUpdate(
    req.params.workId,
    {
      $addToSet: {
        photos: { description, image },
      },
    },
    { new: true },
  )
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((photos) => res.send(photos))
    .catch(next);
};

module.exports.deleteWorkPhoto = (req, res, next) => {
  const { photo, image } = req.body;

  try {
    fs.unlinkSync(image.path);
  } catch {
    console.log(`Изображение не найдено: ${image}`);
  }

  Work.findByIdAndUpdate(
    req.params.workId,
    {
      $pull: {
        photos: { _id: photo },
      },
    },
    { new: true },
  )
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((photos) => res.send(photos))
    .catch(next);
};
