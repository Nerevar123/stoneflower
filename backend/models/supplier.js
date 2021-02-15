const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const supplierSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  isMaterial: {
    type: Boolean,
    required: true,
  },
  image: {
    type: Object,
    binData: Buffer,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('supplier', supplierSchema);
