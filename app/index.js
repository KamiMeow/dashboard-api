const config = require('../config/config');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const db = require('../config/db');

app.connectToDB = () => {
  db.connect();
};

app.use(bodyParser.urlencoded({
  extended: true,
}));

global.config = config;

module.exports = app;
