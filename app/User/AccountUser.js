const mongoose = require('mongoose');

const AccountUserScheme = new mongoose.Schema({
  account: { type: mongoose.Schema.ObjectId, ref: 'Accounts', requierd: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', requierd: true },
  value: { type: String, requierd: true },
});

mongoose.model('AccountUser', AccountUserScheme);

module.exports = mongoose.model('AccountUser');
