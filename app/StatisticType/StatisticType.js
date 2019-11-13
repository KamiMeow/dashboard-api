const mongoose = require('mongoose');

const StatisticType = new mongoose.Schema({
  type: { type: String, unique: true, required: true },
  title: { type: String, required: true },
});

mongoose.model('StatisticType', StatisticType);
module.exports = mongoose.model('StatisticType');
