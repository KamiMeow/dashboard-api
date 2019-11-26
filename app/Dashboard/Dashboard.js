const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  statistic: { type: mongoose.Schema.ObjectId, ref: 'Statistic', required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
});

mongoose.model('Dashboard', DashboardSchema);
module.exports = mongoose.model('Dashboard');
