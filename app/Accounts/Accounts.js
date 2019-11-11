const mongoose = require('mongoose');

const AccountsModel = new mongoose.Schema({
  value: { type: String, uinique: true, required: true },
  name: { type: String, uinique: true, required: true },
  link: { type: String, uinique: true, required: true },
  icon: String,
});

mongoose.model('Accounts', AccountsModel);

module.exports = mongoose.model('Accounts');
