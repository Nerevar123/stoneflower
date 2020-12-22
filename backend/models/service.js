const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const serviceSchema = new mongoose.Schema({
  heading: {
    type: String,
    minlength: 2,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('service', serviceSchema);
