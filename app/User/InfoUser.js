const mongoose = require('mongoose');

const InfoUserScheme = new mongoose.Schema({
  type: { type: mongoose.Schema.ObjectId, ref: 'InfoTypes', unique: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', requierd: true },
  value: { type: String, requierd: true },
});

mongoose.model('InfoUser', InfoUserScheme);

module.exports = mongoose.model('InfoUser');
