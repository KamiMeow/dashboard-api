var mongoose = require('mongoose');
const CONNECTION_STRING = require('./config').CONNECTION_STRING;

module.exports.connect = (callback) => {
  mongoose.connect(CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }, callback);
};
