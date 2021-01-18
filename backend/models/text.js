const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  }
})

const textSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    required: true,
  },
  // text: {
  //   type: String,
  //   // minlength: 2,
  //   required: true,
  // },
  // content: [ fieldSchema ]
  content: [{
    name: String,
    text: String
  }]
});

module.exports = mongoose.model('text', textSchema);
