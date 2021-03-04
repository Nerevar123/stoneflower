const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    minlength: 2,
    required: true,
  },
  text: {
    type: String,
    minlength: 2,
    required: true,
  },
  photos: [{
    description: {
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

module.exports = mongoose.model('work', workSchema);
