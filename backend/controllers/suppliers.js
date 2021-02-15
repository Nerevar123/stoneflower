const fs = require("fs");
const Supplier = require("../models/supplier");
const NotFoundError = require('../errors/not-found-error');
const validationError = require("../errors/validation-error");
const { notFoundErrorMessage } = require('../utils/constants');
const { validationErrorMessage } = require('../utils/constants');

module.exports.getSuppliers = (req, res, next) => {
  Supplier.find({})
    .then((suppliers) => res.send(suppliers))
    .catch(next);
};

module.exports.createSupplier = (req, res, next) => {
  const { link, isMaterial } = req.body;
  let image = req.file;

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
        console.log(data.image);
      }
      Supplier.findByIdAndRemove(req.params.supplierId).then((supplier) =>
        res.send(supplier)
      );
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
      throw new validationError(validationErrorMessage);
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
          console.log(data.image);
        }
      }

      Supplier.findByIdAndUpdate(
        req.params.supplierId,
        { link, isMaterial, image },
        {
          new: true,
          runValidators: true,
        }
      )
        .orFail(new NotFoundError(notFoundErrorMessage))
        .then((supplier) => res.send(supplier));
    })
    .catch(next);
};
