const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema({
  type: { type: mongoose.Schema.ObjectId, ref: 'StatisticType', required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  value: Object,
});

mongoose.model('NewStatistic', StatisticSchema);
module.exports = mongoose.model('NewStatistic');
