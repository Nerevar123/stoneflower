const mongoose = require('mongoose');

const adviceSchema = new mongoose.Schema({
  heading: {
    type: String,
    minlength: 2,
    required: true,
  },
  shortText: {
    type: String,
    minlength: 2,
    required: true,
  },
  expandedText: {
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

module.exports = mongoose.model('advice', adviceSchema);
