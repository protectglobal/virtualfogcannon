const mongoose = require('mongoose');

const schema = mongoose.Schema({
  cannonId: {
    type: String,
    required: [true, 'Cannon id required'],
  },
  state: {
    type: String,
    enum: ['on', 'off'],
    required: [true, 'State is required'],
  },
});

const FogCannon = mongoose.model('FogCannon', schema);

module.exports = FogCannon;
