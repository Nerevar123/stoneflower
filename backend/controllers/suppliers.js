const fs = require('fs');
const Supplier = require('../models/supplier');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const { notFoundErrorMessage, validationErrorMessage } = require('../utils/constants');
const { logger } = require('../middlewares/logger');

module.exports.getSuppliers = (req, res, next) => {
  Supplier.find({})
    .then((suppliers) => res.send(suppliers))
    .catch(next);
};

module.exports.createSupplier = (req, res, next) => {
  const { link, isMaterial } = req.body;
  const image = req.file;

  Supplier.create({ link, isMaterial, image })
    .then((supplier) => res.status(201).send(supplier))
    .catch(next);
};

module.exports.deleteSupplier = (req, res, next) => {
  Supplier.findById(req.params.supplierId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((data) => {
      try {
        fs.unlinkSync(data.image.path);
      } catch {
        logger.error(`Ошибка при удалении: ${JSON.stringify(data.image)}`);
      }
      Supplier.findByIdAndRemove(req.params.supplierId).then((supplier) => res.send(supplier));
    })
    .catch(next);
};

module.exports.updateSupplier = (req, res, next) => {
  const { link, isMaterial } = req.body;
  let image = req.file;
  let newFile = true;

  if (!image) {
    try {
      image = JSON.parse(req.body.image);
    } catch {
      throw new ValidationError(validationErrorMessage);
    }
    newFile = false;
  }

  Supplier.findById(req.params.supplierId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((data) => {
      if (newFile) {
        try {
          fs.unlinkSync(data.image.path);
        } catch {
          logger.error(`Ошибка при удалении: ${JSON.stringify(data.image)}`);
        }
      }

      Supplier.findByIdAndUpdate(
        req.params.supplierId,
        { link, isMaterial, image },
        {
          new: true,
          runValidators: true,
        },
      )
        .orFail(new NotFoundError(notFoundErrorMessage))
        .then((supplier) => res.send(supplier));
    })
    .catch(next);
};
