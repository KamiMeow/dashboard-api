const mongoose = require('mongoose');

const ContactTypeModel = new mongoose.Schema({
  value: { type: String, uinique: true, required: true },
  name: { type: String, uinique: true, required: true },
  regExp: RegExp,
  mask: String,
});

mongoose.model('ContactType', ContactTypeModel);

module.exports = mongoose.model('ContactType');
