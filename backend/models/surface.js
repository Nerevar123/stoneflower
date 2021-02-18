const mongoose = require('mongoose');

const surfaceSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    required: true,
    unique: true,
  },
  examples: [{
    description: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    surface: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      binData: Buffer,
      required: true,
    },
  }],
});

module.exports = mongoose.model('surface', surfaceSchema);
