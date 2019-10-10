var mongoose = require('mongoose');

module.exports.connect = (callback) => {
  mongoose.connect(config.CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }, callback);
};
