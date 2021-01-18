const mongoose = require("mongoose");
const validator = require("validator");

const emailSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true,
  },
  tel: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isMobilePhone(v, "ru-RU"),
      message: "Неправильный формат номера телефона",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Неправильный формат почты",
    },
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

module.exports = mongoose.model("email", emailSchema);
