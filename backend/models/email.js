const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true,
  },
  tel: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 20,

  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 80,
  },
  description: {
    type: String,
    minlength: 2,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('email', emailSchema);
