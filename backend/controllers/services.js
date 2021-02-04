const fs = require("fs");
const Service = require("../models/service");
const NotFoundError = require('../errors/not-found-error');
const { notFoundErrorMessage } = require('../utils/constants');

module.exports.getServices = (req, res, next) => {
  Service.find({})
    .then((services) => res.send(services))
    .catch(next);
};

module.exports.createService = (req, res, next) => {
  const { heading, description } = req.body;
  const image = req.file;

  Service.create({ heading, description, image })
    .then((service) => res.status(201).send(service))
    .catch(next);
};

module.exports.deleteService = (req, res, next) => {
  Service.findById(req.params.serviceId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((data) => {
      try {
        fs.unlinkSync(data.image.path);
      } catch {
        next(new NotFoundError(notFoundErrorMessage));
      }
      Service.findByIdAndRemove(req.params.serviceId).then((service) =>
        res.send(service)
      );
    })
    .catch(next);
};

module.exports.updateService = (req, res, next) => {
  const { heading, description } = req.body;
  let image = req.file;
  let newFile = true;

  if (!image) {
    image = JSON.parse(req.body.image);
    newFile = false;
  }

  Service.findById(req.params.serviceId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((data) => {
      if (newFile) {
        try {
          fs.unlinkSync(data.image.path);
        } catch {
          throw new NotFoundError(notFoundErrorMessage);
        }
      }
      Service.findByIdAndUpdate(
        req.params.serviceId,
        { heading, description, image },
        {
          new: true,
          runValidators: true,
        }
      )
        .orFail(new NotFoundError(notFoundErrorMessage))
        .then((service) => res.send(service));
    })
    .catch(next);
};
