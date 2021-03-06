const mongoose = require('mongoose');

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

module.exports = mongoose.model('service', serviceSchema);
