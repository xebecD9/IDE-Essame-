const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => !/\s/.test(v),
      message: "Le pseudo ne doit pas contenir d'espaces"
    },
    set: (v) => v.toLowerCase()
  },
  bestScore: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', userSchema);
