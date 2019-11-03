const mongoose = require('mongoose');

module.exports.connect = (callback) => {
  mongoose.connect(config.CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  }, callback);
};
