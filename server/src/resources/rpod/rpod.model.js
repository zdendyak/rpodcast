const mongoose = require('mongoose');

const rpodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  audio: {
    type: String,
    // required: true
  },
  imageUrl: {
    type: String
  },
  text: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Rpod = mongoose.model('Rpod', rpodSchema);

module.exports = Rpod;