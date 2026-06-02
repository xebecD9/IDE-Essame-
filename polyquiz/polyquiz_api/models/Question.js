const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length >= 2,
      message: 'Une question doit avoir au moins 2 options'
    }
  },
  correctAnswer: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['facile', 'moyen', 'difficile'],
    default: 'moyen'
  }
});

module.exports = mongoose.model('Question', questionSchema);
