const mongoose = require('mongoose');

const InfoTypeSchema = mongoose.Schema({
  name: { type: String, reqiured: true, unique: true },
  type: { type: String, reqiured: true },
  validation: [String, RegExp],
});

mongoose.model('InfoType', InfoTypeSchema);

module.exports = mongoose.model('InfoTypeSchema');
