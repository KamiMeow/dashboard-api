const mongoose = require('mongoose');  ;

class Model {
  constructor(schema) {
    return new mongoose.Schema(schema)
  }

  model(name, schema) {
    mongoose.model(name, schema);
  }
};

module.exports = Model;
