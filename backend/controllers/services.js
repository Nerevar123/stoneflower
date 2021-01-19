const fs = require("fs");
const Service = require("../models/service");
const validationError = require('../errors/validation-error');

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
    .orFail(new Error("notFound"))
    .then((data) => {
      try {
        fs.unlinkSync(data.image.path);
      } catch {
        next(new Error("notFound"));
      }
      Service.findByIdAndRemove(req.params.serviceId).then((service) =>
        res.send(service)
      );
    })
    .catch(next);
};

module.exports.updateService = (req, res, next) => {
  const { heading, description } = req.body;
  const image = req.file;
  if (!image) throw new validationError("Необходимо прикрепить изображение");

  Service.findById(req.params.serviceId)
    .orFail(new Error("notFound"))
    .then((data) => {
      try {
        fs.unlinkSync(data.image.path);
      } catch {
        throw new Error("notFound");
      }
      Service.findByIdAndUpdate(
        req.params.serviceId,
        { heading, description, image },
        {
          new: true,
          runValidators: true,
        }
      )
        .orFail(new Error("notFound"))
        .then((service) => res.send(service));
    })
    .catch(next);
};
