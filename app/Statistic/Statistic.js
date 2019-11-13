const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema({
  type: { type: mongoose.Schema.ObjectId, ref: 'StatisticType', required: true },
  title: { type: String, unique: true, required: true },
  value: Object,
});

mongoose.model('Statistic', StatisticSchema);
module.exports = mongoose.model('Statistic');
