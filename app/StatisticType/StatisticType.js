const mongoose = require('mongoose');

const StatisticTypeSchema = new mongoose.Schema({
  type: { type: String, unique: true, required: true },
  title: { type: String, required: true },
});

mongoose.model('StatisticType', StatisticTypeSchema);
module.exports = mongoose.model('StatisticType');
