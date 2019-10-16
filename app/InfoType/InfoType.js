const mongoose = require('mongoose');

const InfoTypeModel = new mongoose.Schema({
  name: { type: String, reqiured: true, unique: true },
  type: { type: String, reqiured: true },
  validation: [String, RegExp],
});

mongoose.model('InfoType', InfoTypeModel);

module.exports = mongoose.model('InfoType');
