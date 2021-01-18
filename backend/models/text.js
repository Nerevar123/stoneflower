const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    required: true,
  },
  // text: {
  //   type: Array,
  //   // minlength: 2,
  //   required: true,
  // },
  text: [{
    type: String,
    required: true,
  }]
});

module.exports = mongoose.model('text', textSchema);
