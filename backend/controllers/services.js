const Service = require('../models/service');

module.exports.getServices = (req, res, next) => {
  Service.find({})
    .then((services) => res.send(services))
    .catch(next);
};

module.exports.createService = (req, res, next) => {
  const { heading, description, link } = req.body;

  Service.create({ heading, description, link })
    .then((service) => res.status(201).send(service))
    .catch(next);
};

// module.exports.deleteCard = (req, res, next) => {
//   Card.findById(req.params.cardId)
//     .orFail(new Error('cardNotFound'))
//     .then((data) => {
//       // eslint-disable-next-line eqeqeq
//       if (data.owner != req.user._id) {
//         throw new Error('forbidden');
//       }
//       Card.findByIdAndRemove(req.params.cardId)
//         .then((card) => res.send(card));
//     })
//     .catch(next);
// };

// module.exports.putLike = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true },
//   )
//     .orFail(new Error('cardNotFound'))
//     .then((card) => res.send(card))
//     .catch(next);
// };

// module.exports.deleteLike = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   )
//     .orFail(new Error('cardNotFound'))
//     .then((card) => res.send(card))
//     .catch(next);
// };
